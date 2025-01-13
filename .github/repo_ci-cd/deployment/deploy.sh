#!/usr/bin/env bash

# https://elrey.casa/bash/scripting/harden
# set -${-//[sc]/}eu${DEBUG+xv}o pipefail
set -${-//[sc]/}e${DEBUG+xv}o pipefail


function pagefind_setup(){
  if [[ $(command -v pagefind) ]] ; then
    :
  else
    tmp_dir="$(mktemp -d)"
    os_version="$(uname -o | tr '[[:upper:]]' '[[:lower:]]')"
    if [[ "${os_version}" == 'linux' ]] ; then
      other_os_info='unknown'
      other_other_os_info='-musl'
    elif [[ "${os_version}" == 'darwin' ]] ; then
      other_os_info='darwin'
      os_version='apple'
    else
      printf 'IDK what this is...: %s\n' "${os_version}"
    fi
    os_arch="$(uname -m)"
    if [[ "${os_arch}" == 'arm64' ]] ; then
      os_arch='aarch64'
    fi
    curl -o "${tmp_dir}/pagefind.tgz" -fsSL "https://github.com/CloudCannon/pagefind/releases/download/v1.1.1/pagefind-v1.1.1-${os_arch}-${other_os_info}-${os_version}${other_other_os_info:-}.tar.gz"
    tar -C "${tmp_dir}" -xzvf "${tmp_dir}/pagefind.tgz"
    if [ "$EUID" -ne 0 ]; then
      sudo install "${tmp_dir}/pagefind" /usr/local/bin/
    else
      install "${tmp_dir}/pagefind" /usr/local/bin/
    fi
  fi
}

function pagefind_deploy(){
  pagefind --site "${1}" --glob 'stories/**/*.{html}'
}

function version_info(){

  echo -e "\n${BOLD}Versions:${PLAIN}"
  echo -ne "${BOLD}Hugo: ${PLAIN}"
  hugo version
  echo -ne "${BOLD}Pagefind: ${PLAIN}"
  pagefind --version
  # echo -ne "${BOLD}Pygments: ${PLAIN}"
  # pygmentize -V
  # echo -ne "${BOLD}Asciidoctor: ${PLAIN}"
  # asciidoctor --version
  # echo -ne "${BOLD}PostCSS: ${PLAIN}"
  # postcss --version
  # echo -ne "${BOLD}Pandoc: ${PLAIN}"
  # pandoc -v
  # echo -ne "${BOLD}Babel: ${PLAIN}"
  # babel --version

}

function everything(){

  gh_base_dir='/tmp/gh-pages'
  echo -e "\n${BOLD}Setting up Git${PLAIN}"
  git config --global user.name "${GITHUB_ACTOR}"
  git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
  echo "machine github.com login ${GITHUB_ACTOR} password ${GITHUBTOKEN}" > ~/.netrc

  git clone --depth=1 --single-branch --branch "${GH_PAGES}" "https://github.com/${REPO}.git" /tmp/gh-pages
  rm -rf "${gh_base_dir}"/*


  echo -e "\n${BOLD}Generating Site ${NAME} at commit ${GITHUB_SHA}${PLAIN}"
  cd ${CD}
  hugo mod get
  hugo ${ARGZ} -d "${gh_base_dir}"
  pagefind_deploy "${gh_base_dir}"

  if [[ -f CNAME ]] ; then
    cp -v CNAME "${gh_base_dir}"
  fi


  echo -e "\n${BOLD}Commiting${PLAIN}"
  cd "${gh_base_dir}"

  [ -n "${INPUT_CNAME}" ] && \
  echo "${INPUT_CNAME}" > CNAME

  git add -A && git commit --allow-empty -am "Publishing Site ${NAME} at ${GITHUB_SHA} on $(date -u)"


  echo -e "\n${BOLD}Pushing${PLAIN}"
  git push --force

  echo -e "\n${BOLD}Site ${NAME} at ${GITHUB_SHA} was successfully deployed!${PLAIN}"
}
function input_check(){
  if [ "${HUGOVERSION}" ]; then
    echo -e "\n${BOLD}Using Hugo version ${INPUT_HUGOVERSION}.${PLAIN}"
    wget "https://github.com/gohugoio/hugo/releases/download/v$(echo "${INPUT_HUGOVERSION}" | grep -o  "[0-9]\+.[0-9]\+.[0-9]\+")/hugo_${INPUT_HUGOVERSION}_Linux-64bit.tar.gz"
    tar x -zvf hugo*.tar.gz
    mv hugo /usr/bin/hugo
    rm hugo*.tar.gz
  fi


  if [ "${INPUT_CNAME}" ]; then
    NAME=${INPUT_CNAME}
  else
    NAME=${GITHUB_REPOSITORY}
  fi

  if [ "${INPUT_REPO}" ]; then
    REPO=${INPUT_REPO}
  else
    REPO=${GITHUB_REPOSITORY}
  fi

  CD=${INPUT_SITEDIR:=$(pwd)}

  if [[ -z "${GITHUBTOKEN}" ]] ; then
    echo -e "\n${BOLD}ERROR: Missing githubToken.${PLAIN}" ; exit 1
  fi
}

function main(){

  PLAIN='\033[0m'
  BOLD='\033[1;37m'
  pagefind_setup
  version_info
  input_check
  everything

}

# https://elrey.casa/bash/scripting/main
if [[ "${0}" = "${BASH_SOURCE[0]:-bash}" ]] ; then
  main "${@}"
fi

##################################################
#   used for reference, please ignore            #
##################################################
# script reference was from this repo: https://github.com/chabad360/hugo-actions
# marketplace entry: https://github.com/marketplace/actions/hugo-to-gh-pages
# oringal docker image built from this: https://github.com/chabad360/hugo-gh-pages/blob/42a562fbeb44e0877909dd61d158d9aa4e0a8e13/Dockerfile
##################################################
## action.yml
# name: 'Hugo to GH Pages'
# author: 'chabad360'
# description: 'GitHub Action for Building a Hugo Site and Pushing it to Github Pages'
# 
# inputs:
#   githubToken:
#     description: 'A Github Personal Access Token with Repo permissions'
#     required: true
# 
#   cname:
#     description: 'The custom domain name for your GH Pages Site'
#     required: false
# 
#   branch:
#     description: 'The branch to push the built site to'
#     required: false
#     default: 'gh-pages'
#   
#   repo:
#     description: 'The repo to push the built site to'
#     required: false
#   
#   hugoVersion:
#     description: 'The version of hugo to use'
#     required: false
# 
#   args:
#     description: 'Arguments to pass to Hugo'
#     required: false
#     default: --gc --minify --cleanDestinationDir
#     
#   siteDir:
#     description: "Directory for Hugo Site (if it's not the root of the repo)"
#     required: false
# 
# runs:
#   using: 'docker'
# #  image: 'docker://docker.pkg.github.com/chabad360/hugo-gh-pages/hugo'
#   image: 'Dockerfile'
# 
# branding:
#   icon: 'upload-cloud'  
#   color: 'red'
# 
