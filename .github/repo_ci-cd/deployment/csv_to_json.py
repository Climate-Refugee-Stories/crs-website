#!/usr/bin/env python3

# from argparse import ArgumentParser
# from pathlib import Path
import dask.dataframe as dd

def main():
    # parser = ArgumentParser(description="""
    #     This small python program convers csv files to json
    # """)

    # parser.add_argument('csv_input', type=Path, help="""
    #     This is the path to the csv file you want to convert
    # """)

    # args = parser.parse_args()

    file_url = 'https://docs.google.com/spreadsheets/d/14KVHigDGfs9yDVmw96mWSMAG2wRaFc7B9WtLuukm3Uk/gviz/tq?tqx=out:csv&sheet=Sheet1'

    data_types = {
        'Video ID': 'object',
        'Photo ID': 'object',
    }
    # csv_df = dd.read_csv(args.csv_input,dtype = data_types).compute()
    csv_df = dd.read_csv(urlpath=file_url,dtype = data_types).compute()
    # https://stackoverflow.com/a/49551419
    # strips out leading and trailing whitespace for strings
    csv_df = csv_df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    print(csv_df.to_json(orient='records', indent=2,))

if __name__ == "__main__":
    main()
