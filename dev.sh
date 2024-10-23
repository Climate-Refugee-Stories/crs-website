#!/usr/bin/env bash

# https://elrey.casa/bash/scripting/harden
set -${-//[sc]/}eu${DEBUG+xv}o pipefail

function alpine_prep(){
  apk add --no-cache curl && apk add --no-cache --upgrade curl
}

function main(){
  [[ -r /etc/os-release ]] && [[ $(grep '=alpine' /etc/os-release) ]] && alpine_prep
  source <(grep -v '^set' .github/repo_ci-cd/deployment/deploy.sh)
  pagefind_setup
  hugo -D
  pagefind_deploy ./public
  echo "Execute the following from now on: ${0} && hugo serve -D --renderToDisk"
}

# https://elrey.casa/bash/scripting/main
if [[ "${0}" = "${BASH_SOURCE[0]:-bash}" ]] ; then
  main "${@}"
fi