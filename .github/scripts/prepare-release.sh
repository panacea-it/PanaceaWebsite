#!/bin/bash
# Prepare a release directory for the Panacea website. Does not restart anything.
set -euo pipefail

REL=/data/releases/panacea-website
APP=/data/home-ubuntu/apps/panacea-website

mkdir -p "${REL}/shared"

if [ ! -f "${REL}/shared/.env" ]; then
  if [ ! -f "${APP}/.env" ]; then
    echo "Live .env is missing; refusing to deploy" >&2
    exit 1
  fi
  cp -L "${APP}/.env" "${REL}/shared/.env"
  chmod 600 "${REL}/shared/.env"
fi

if [ ! -f "${REL}/shared/.env.production" ] && [ -f "${APP}/.env.production" ]; then
  cp -L "${APP}/.env.production" "${REL}/shared/.env.production"
  chmod 600 "${REL}/shared/.env.production"
fi

avail="$(df -B1 --output=avail /data | tail -n 1 | tr -d ' ')"
if [ "${avail}" -lt 2147483648 ]; then
  echo "/data has less than 2GB free; aborting" >&2
  exit 1
fi

rm -rf "${REL}/incoming"
mkdir -p "${REL}/incoming"
echo "Prepared ${REL}/incoming"
