"""General-purpose on-disk data structures."""

import os
import math
from pathlib import Path
import mmap
from array import array
import itertools
from functools import total_ordering

################################################################################
## On-disk arrays of numbers

ENDIANNESS = 'little'

class DiskIntArray:
    _typecodes = {1: 'B', 2: 'H', 4: 'I', 8: 'Q'}
    for n, c in _typecodes.items(): assert array(c).itemsize == n

    def __init__(self, path):
        path = Path(path)
        self._file = open(path, 'rb')
        with open(str(path) + '.elemsize') as file:
            self._elemsize = int(file.read().strip())

        self._file.seek(0, os.SEEK_END)
        self._length = self._file.tell() // self._elemsize

        if self._elemsize in self._typecodes:
            bytes = mmap.mmap(self._file.fileno(), 0, prot=mmap.PROT_READ)
            self._array = memoryview(bytes).cast(self._typecodes[self._elemsize])
        else:
            self._array = None

    def __len__(self):
        return self._length

    def __getitem__(self, i):
        if self._array is not None:
            return self._array[i]
        else:
            if isinstance(i, slice):
                return list(self._slice(i))

            if not isinstance(i, int):
                raise TypeError("invalid array index type")

            if i < 0 or i >= len(self):
                raise IndexError("array index out of range")

            self._file.seek(i * self._elemsize)
            return int.from_bytes(self._file.read(self._elemsize), byteorder=ENDIANNESS)

    def _slice(self, slice):
        start, stop, step = slice.indices(len(self))
        if step != 1: raise IndexError("only slices with step 1 supported")

        for i in range(start, stop):
            yield self[i]

    def __iter__(self):
        if self._array is None:
            self._array.seek(0)
            for _ in range(self._length):
                yield int.from_bytes(self._array.read(self._elemsize), byteorder=ENDIANNESS)
        else:
            yield from self._array

    @staticmethod
    def build(path, values, max_value = None, use_mmap=False):
        if max_value is None:
            values = list(values)
            max_value = max(values)

        builder = DiskIntArrayBuilder(path, max_value, use_mmap)
        for value in values: builder.append(value)
        builder.close()
        return DiskIntArray(path)

class DiskIntArrayBuilder:
    def __init__(self, path, max_value=None, use_mmap=False):
        if max_value is None: max_value = 2**32-1
        self._path = Path(path)
        self._max_value = max_value

        self._elem_size = self._min_bytes_to_store_values(max_value)
        if use_mmap:
            if self._elem_size == 3: self._elem_size = 4
            if self._elem_size > 4 and self._elem_size <= 8: self._elem_size = 8
            if self._elem_size > 8:
                raise RuntimeError('DiskIntArray: use_mmap=True not supported with self._elem_size > 8')

        with open(str(path) + '.elemsize', 'w') as file:
            file.write(str(self._elem_size))
        self._file = open(path, 'wb')

    def append(self, value):
        self._file.write(value.to_bytes(self._elem_size, byteorder=ENDIANNESS))

    def __setitem__(self, k, value):
        self._file.seek(k * self._elem_size)
        self._file.write(value.to_bytes(self._elem_size, byteorder=ENDIANNESS))
        self._file.seek(0, os.SEEK_END)

    def __len__(self):
        return self._file.tell() // self._elem_size

    def close(self):
        self._file.close()
        self._file = None

    def _min_bytes_to_store_values(self, max_value):
        return math.ceil(math.log(max_value + 1, 2) / 8)

################################################################################
## String interning

class StringCollection:
    def __init__(self, path):
        path = Path(path)
        stringsfile = open(path, 'rb')
        self._path = path
        self._strings = mmap.mmap(stringsfile.fileno(), 0, prot=mmap.PROT_READ)
        self._starts = DiskIntArray(path.with_suffix(path.suffix + '.starts'))
        self._lengths = DiskIntArray(path.with_suffix(path.suffix + '.lengths'))
        self._intern = None

    def __len__(self):
        return len(self._starts)

    def from_index(self, index):
        return InternedString(self, index)

    def preload(self):
        if self._intern is None:
            self._intern = {}
            for i in range(len(self)):
                self._intern[bytes(self.from_index(i))] = i

    def intern(self, string):
        if isinstance(string, InternedString) and string._db is self:
            return string

        string = bytes(string)

        if self._intern is not None:
            return self.from_index(self._intern[string])

        lo = 0
        hi = len(self)-1
        while lo <= hi:
            mid = (lo+hi)//2
            here = bytes(self.from_index(mid))
            if string < here:
                hi = mid-1
            elif string > here:
                lo = mid+1
            else:
                return self.from_index(mid)
        raise KeyError("string not found in database")

    @staticmethod
    def build(path, strings):
        stringset = set()
        for i, word in enumerate(strings):
            stringset.add(word)

        stringlist = list(stringset)
        stringlist.sort()

        with open(path.with_suffix('.strings'), 'wb') as stringsfile:
            for string in stringlist: stringsfile.write(string)

        DiskIntArray.build(path.with_suffix('.strings.starts'),
            itertools.accumulate((len(s) for s in stringlist[:-1]), initial=0),
            use_mmap = True)

        DiskIntArray.build(path.with_suffix('.strings.lengths'),
            (len(s) for s in stringlist),
            use_mmap = True)

        return StringCollection(path)

@total_ordering
class InternedString:
    __slots__ = ['_db', 'index']

    def __init__(self, db, index):
        object.__setattr__(self, "_db", db)
        object.__setattr__(self, "index", index)

    def __bytes__(self):
        start = self._db._starts[self.index]
        length = self._db._lengths[self.index]
        return self._db._strings[start:start+length]

    def __str__(self):
        return str(bytes(self))

    def __repr__(self):
        return f"InternedString({self})"

    def __eq__(self, other):
        if isinstance(other, InternedString) and self._db is other._db:
            return self.index == other.index
        else:
            raise TypeError(f"Comparing InternedString against {type(other)}")

    def __lt__(self, other):
        if isinstance(other, InternedString) and self._db is other._db:
            return self.index < other.index
        else:
            raise TypeError(f"Comparing InternedString against {type(other)}")

    def __hash__(self):
        return hash(self.index)

    def __setattr__(self, _field, _value):
        raise TypeError("InternedString is read-only")

    def __delattr__(self, _field):
        raise TypeError("InternedString is read-only")

################################################################################
## On-disk arrays of interned strings

class DiskStringArray:
    def __init__(self, path):
        path = Path(path)
        self._array = DiskIntArray(path)
        self._strings = StringCollection(path.with_suffix(path.suffix + '.strings'))

    def raw(self):
        return self._array

    def intern(self, x):
        return self._strings.intern(x)

    def __len__(self):
        return len(self._array)

    def __getitem__(self, i):
        if isinstance(i, slice):
            return list(self._slice(i))

        if not isinstance(i, int):
            raise TypeError("invalid array index type")

        return self._strings.from_index(self._array[i])

    def _slice(self, slice):
        return map(self._strings.from_index, self._array[slice])

    def __iter__(self):
        yield from self._slice(slice(None))

    @staticmethod
    def build(path, values, strings=None, use_mmap=False):
        if strings is None:
            values = strings = list(values)

        builder = DiskStringArrayBuilder(path, strings, use_mmap)
        for value in values:
            builder.append(value)
        builder.close()

        return DiskStringArray(path)

class DiskStringArrayBuilder:
    def __init__(self, path, strings, use_mmap=False):
        self._path = Path(path)
        strings_path = path.with_suffix(path.suffix + '.strings')
        StringCollection.build(strings_path, strings)
        self._strings = StringCollection(strings_path)
        self._strings.preload()
        self._builder = DiskIntArrayBuilder(path, len(self._strings)-1, use_mmap)

    def append(self, value):
        self._builder.append(self._strings.intern(value).index)

    def close(self):
        self._builder.close()
        self._builder = None
