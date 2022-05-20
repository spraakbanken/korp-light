
# Korp-search

Searching in very large corpora.

The basic idea is to use [inverted indexes](https://en.wikipedia.org/wiki/Inverted_index) to lookup queries. We build two kinds of indexes -- unary (for looking up one single feature), and binary (for looking up a pair of adjacent features). A complex search query is then translated to a conjunction of simple queries which use unary of binary indexes. Then we calculate the intersection of all query results, and filter the final result according to the original query.

## Building inverted indexes

The following builds search indexes for the BNC-mini corpus using the features `word`, `lemma`, and `pos`:

```
python build_indexes.py corpora/bnc-mini.csv --features word lemma pos --max-dist 2 --verbose
```

`--max-dist` tells how many different binary indexes that will be created: it's the maximum adjacent distance between the tokens in the query. The default setting is 2.

This creates two directories:

- `corpora/bnc-mini.corpus/`: compact and efficient representation of the corpus
- `corpora/bnc-mini.index/`: all the different inverted indexes

The original `.csv` file is not used when searching.

## Searching

To search, you just provide a query as the second argument:

```
python search_corpus.py corpora/bnc-mini '[pos="ART"] [lemma="small"] [pos="SUBST"]' --filter --verbose
```

`--filter` performs the final filter of the list of search results. This can take quite a long time if the corpus is big and the query is general.
