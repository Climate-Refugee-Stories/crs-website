#!/usr/bin/env python3

from argparse import ArgumentParser
from pathlib import Path
from json import dumps as j_dumps
import dask.dataframe as dd

def main():
    parser = ArgumentParser(description="""
        This small python program convers csv files to json
    """)

    parser.add_argument('csv_input', type=Path, help="""
        This is the path to the csv file you want to convert
    """)

    args = parser.parse_args()

    csv_df = dd.read_csv(args.csv_input).compute()
    print(csv_df.to_json(orient='records', indent=2))

if __name__ == "__main__":
    main()
