# cython: language_level=3

from disk import SlowDiskIntArray
import sys

from libc.stdlib cimport malloc, free

ctypedef const unsigned char[::1] buffer

cdef buffer to_buffer(array, start, length):
    """Convert an array to an array of bytes."""

    cdef buffer result
    start *= elemsize(array)
    length *= elemsize(array)

    if isinstance(array, memoryview):
        result = array.obj
    elif isinstance(array, SlowDiskIntArray):
        assert array._byteorder == sys.byteorder
        result = array._array
    else:
        assert False, "argument to to_memoryview has unknown type"

    return result[start:start+length]

cdef elemsize(array):
    """Find the element size of an array."""

    if isinstance(array, memoryview):
        return array.itemsize
    elif isinstance(array, SlowDiskIntArray):
        return array._elemsize
    else:
        assert False, "argument to elemsize has unknown type"

def intersection(arr1, start1, length1, arr2, start2, length2):
    """Take the intersection of two sorted arrays."""

    assert elemsize(arr1) == elemsize(arr2)
    size = elemsize(arr1)

    # Generate specialised code for each value of 'size'.
    # This improves performance because it allows the C compiler to specialise
    # read_bytes and write_bytes to the given size.
    if size == 1: return intersection_core(arr1, start1, length1, arr2, start2, length2, 1)
    elif size == 1: return intersection_core(arr1, start1, length1, arr2, start2, length2, 2)
    elif size == 1: return intersection_core(arr1, start1, length1, arr2, start2, length2, 3)
    elif size == 1: return intersection_core(arr1, start1, length1, arr2, start2, length2, 4)
    else: return intersection_core(arr1, start1, length1, arr2, start2, length2, size)

cdef inline intersection_core(arr1, start1, length1, arr2, start2, length2, int size):
    cdef buffer buf1 = to_buffer(arr1, start1, length1)
    cdef buffer buf2 = to_buffer(arr2, start2, length2)

    cdef const unsigned char* in1 = &buf1[0]
    cdef const unsigned char* in2 = &buf2[0]
    cdef int len1 = buf1.nbytes
    cdef int len2 = buf2.nbytes

    out = <char*>malloc(max(len1, len2))

    cdef int i = 0
    cdef int j = 0
    cdef int k = 0

    while i < len1 and j < len2:
        x = read_bytes(in1+i, size)
        y = read_bytes(in2+j, size)

        if x < y: i += size
        elif x > y: j += size
        else:
            write_bytes(out+k, x, size)
            i += size
            j += size
            k += size

    result = SlowDiskIntArray(out[:k], size, sys.byteorder)
    free(out)
    return result

cdef extern from "string.h":
    void *memcpy(void *dest, const void *src, size_t len)

cdef inline long read_bytes(const void *ptr, int size):
    """Read an integer of the given number of bytes from a pointer."""

    cdef long result = 0
    memcpy(&result, ptr, size)
    return result

cdef inline void write_bytes(void *ptr, long value, int size):
    """Write an integer of the given number of bytes to a pointer."""

    memcpy(ptr, &value, size)
