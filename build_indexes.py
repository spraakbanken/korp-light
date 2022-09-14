
import shutil
import argparse
import itertools
from pathlib import Path
from typing import List
import logging

from index import Template, InvertedIndex, SAIndex
from corpus import Corpus
from util import setup_logger


################################################################################
## Building the corpus index and the query indexes

def main(args:argparse.Namespace):
    if args.suffix_array:
        Index = SAIndex
    else:
        Index = InvertedIndex

    base = Path(args.corpus)
    corpusdir = base.with_suffix(Corpus.dir_suffix)
    indexdir = base.with_suffix(Index.dir_suffix)

    if args.clean:
        shutil.rmtree(corpusdir, ignore_errors=True)
        for i in (InvertedIndex, SAIndex):
            shutil.rmtree(base.with_suffix(i.dir_suffix), ignore_errors=True)
        logging.info(f"Removed all indexes")

    if args.corpus_index:
        corpusdir.mkdir(exist_ok=True)
        corpusfile = base.with_suffix('.csv')
        Corpus.build_from_csv(corpusdir, corpusfile)
        logging.info(f"Created the corpus index")

    if args.features or args.templates:
        with Corpus(base) as corpus:
            indexdir.mkdir(exist_ok=True)
            ctr = 0
            for template in itertools.chain(
                                yield_templates(args.features, args.max_dist),
                                map(Template.parse, args.templates),
                            ):
                Index.build(
                    corpus, template, 
                    min_frequency=args.min_frequency, 
                    keep_tmpfiles=args.keep_tmpfiles, 
                    use_sqlite=not args.no_sqlite,
                )
                ctr += 1
            logging.info(f"Created {ctr} query indexes")


def yield_templates(features:List[str], max_dist:int):
    for feat in features:
        yield Template([(feat, 0)])
    for feat in features:
        for feat1 in features:
            for dist in range(1, max_dist+1):
                yield Template([(feat, 0), (feat1, dist)])


################################################################################
## Main

parser = argparse.ArgumentParser(description='Test things')
parser.add_argument('corpus', type=Path, help='corpus base name (i.e. without suffix)')

parser.add_argument('--clean', action='store_true',
    help='remove the corpus index and all query indexes')
parser.add_argument('--corpus-index', '-c', action='store_true',
    help='build the corpus index')
parser.add_argument('--features', '-f', nargs='+', default=[],
    help='build all possible (unary and binary) query indexes for the given features')
parser.add_argument('--templates', '-t', nargs='+', default=[],
    help='build query indexes for the given templates: e.g., pos.0 (unary index), or word.0-pos.2 (binary index)')

parser.add_argument('--max-dist', type=int, default=2, 
                    help='[only with the --features option] max distance between token pairs (default: 2)')
parser.add_argument('--min-frequency', type=int, default=0,
                    help='[only for binary indexes] min unary frequency for all values in a binary instance')

parser.add_argument('--verbose', '-v', action="store_const", dest="loglevel", const=logging.DEBUG, help='verbose output')
parser.add_argument('--silent', action="store_const", dest="loglevel", const=logging.WARNING, default=logging.INFO, help='silent (no output)')

parser.add_argument('--keep-tmpfiles', action='store_true', help='keep temporary files')
parser.add_argument('--suffix-array', action='store_true', help='use suffix arrays as indexes (experimental)')
parser.add_argument('--no-sqlite', action='store_true', help="don't use sqlite to build suffix arrays (experimental)")


if __name__ == '__main__':
    args : argparse.Namespace = parser.parse_args()
    setup_logger('{relativeCreated:8.2f} min {warningname}| {message}', timedivider=60*1000, loglevel=args.loglevel)
    main(args)
