#!/usr/bin/env python3

from os import getenv
from pathlib import Path
from json import loads as j_loads, dumps as j_dumps
from sys import exit as s_exit
from algoliasearch.search_client import SearchClient


def get_base_dirs() -> Path:
    current_base_dir = Path().cwd()
    base_dir = None

    current_dir = current_base_dir
    index = 0
    while not base_dir:
        for item in current_dir.glob("./*"):
            if item.is_dir():
                if item.name == ".git":
                    base_dir = item.parent
        current_dir = Path(current_dir / "..")
        if index >= 25:
            print("Went up 25 directories at least, stopping now...")
            s_exit(1)

    # for this run the following command at the root of the directory
    #   hugo --gc --minify --cleanDestinationDir -d tmp/ -e prod
    return Path(base_dir / "tmp").resolve()


# based on:
# https://github.com/algolia-samples/api-clients-quickstarts/tree/f2867a3cb958aab620d6d8e5ffdfd1bf974699d8/python


def main():
    app_id = getenv("ALGOLIA_APP_ID")
    api_key = getenv("ALGOLIA_API_KEY")
    index_name = getenv("ALGOLIA_INDEX_NAME")

    # if running in CI or doing local development
    env = getenv("CI") or None
    base_dir = Path("/tmp/gh-pages") if env else get_base_dirs()
    algolia_file = Path(base_dir / "algolia.json")

    records = j_loads(algolia_file.read_text())

    client = SearchClient.create(app_id, api_key)
    index = client.init_index(index_name)
    res = index.clear_objects()
    res.wait()
    res = index.save_objects(records)

    print(f"records pushed:\n{j_dumps(records,indent=2)}")

    # not waiting if production, because GH action limits
    if not env:
        res.wait()


if __name__ == "__main__":
    main()
