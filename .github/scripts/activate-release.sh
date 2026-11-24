#!/bin/bash
# Switch the live Panacea website to a staged release, or restore the previous one.
# Restarts only the panacea-website process.
set -euo pipefail

REL=/data/releases/panacea-website
APP=/data/home-ubuntu/apps/panacea-website
SHA="${GITHUB_SHA:-}"
RUN_ID="${GITHUB_RUN_ID:-manual}"
ROLLBACK="${ROLLBACK:-false}"

pm2_others() {
  pm2 jlist | python3 -c '
import json, sys
wanted = ("sriram-ias-api", "sriram-ias-api-staging", "host-health")
counts = {}
for app in json.load(sys.stdin):
    name = app.get("name")
    if name in wanted:
        counts.setdefault(name, {})
        status = app.get("pm2_env", {}).get("status", "unknown")
        counts[name][status] = counts[name].get(status, 0) + 1
for name in wanted:
    print(name, counts.get(name, {}))
'
}

health() {
  local expect="$1"
  local attempt code asset acode
  for attempt in $(seq 1 15); do
    code="$(curl -sS --resolve www.panaceaitservices.com:443:127.0.0.1 \
      -o /tmp/panacea-website-check.html -w '%{http_code}' --max-time 15 \
      https://www.panaceaitservices.com/ || echo 000)"
    if [ "${code}" = "200" ] && grep -q "${expect}" /tmp/panacea-website-check.html; then
      asset="$(grep -oE '/_next/static/[^"[:space:]]+' /tmp/panacea-website-check.html | head -n 1 || true)"
      if [ -n "${asset}" ]; then
        acode="$(curl -sS --resolve www.panaceaitservices.com:443:127.0.0.1 \
          -o /dev/null -w '%{http_code}' --max-time 15 \
          "https://www.panaceaitservices.com${asset}" || echo 000)"
        if [ "${acode}" != "200" ]; then
          echo "Asset ${asset} returned ${acode}" >&2
          sleep 2
          continue
        fi
      fi
      echo "Healthy (attempt ${attempt})"
      return 0
    fi
    echo "Health attempt ${attempt} returned ${code}" >&2
    sleep 2
  done
  echo "Last title: $(sed -n 's:.*<title>\([^<]*\)</title>.*:\1:p' /tmp/panacea-website-check.html | head -n 1)" >&2
  return 1
}

assert_others_unchanged() {
  local after
  after="$(pm2_others)"
  if [ "${after}" != "${OTHERS_BEFORE}" ]; then
    echo "Other PM2 apps changed state" >&2
    echo "before: ${OTHERS_BEFORE}" >&2
    echo "after:  ${after}" >&2
    exit 1
  fi
}

switch_to() {
  local target="$1"
  ln -sfn "${target}" "${REL}/current"
  if [ -d "${APP}" ] && [ ! -L "${APP}" ]; then
    echo "Live path is still a real directory; cannot switch" >&2
    exit 1
  fi
  ln -sfn "${REL}/current" "${APP}"
  pm2 restart panacea-website
}

OTHERS_BEFORE="$(pm2_others)"

if [ "${ROLLBACK}" = "true" ]; then
  if [ ! -L "${REL}/current" ]; then
    echo "No current release symlink to roll back" >&2
    exit 1
  fi
  current="$(readlink -f "${REL}/current")"
  previous=""
  while IFS= read -r candidate; do
    [ -n "${candidate}" ] || continue
    if [ "$(readlink -f "${candidate}")" != "${current}" ]; then
      previous="${candidate}"
      break
    fi
  done < <(find "${REL}" -mindepth 2 -maxdepth 2 -name .release-ok -printf '%T@ %h\n' | sort -nr | awk '{print $2}')
  if [ -z "${previous}" ]; then
    echo "No previous successful release to restore" >&2
    exit 1
  fi
  echo "Restoring ${previous}"
  switch_to "${previous}"
  health "Panacea IT Services"
  assert_others_unchanged
  pm2 save
  exit 0
fi

if [ -z "${SHA}" ]; then
  echo "GITHUB_SHA is required" >&2
  exit 1
fi

if [ ! -f "${REL}/incoming/server.js" ]; then
  echo "Incoming bundle is missing server.js" >&2
  exit 1
fi
if [ ! -d "${REL}/incoming/.next/static" ] || [ ! -d "${REL}/incoming/public" ]; then
  echo "Incoming bundle is missing static files or public/" >&2
  exit 1
fi
if [ ! -f "${REL}/shared/.env" ]; then
  echo "Shared .env is missing" >&2
  exit 1
fi

TARGET="${REL}/release-${SHA}-${RUN_ID}"
rm -rf "${TARGET}"
mv "${REL}/incoming" "${TARGET}"
ln -sfn "${REL}/shared/.env" "${TARGET}/.env"
if [ -f "${REL}/shared/.env.production" ]; then
  ln -sfn "${REL}/shared/.env.production" "${TARGET}/.env.production"
fi
{
  echo "sha=${SHA}"
  echo "run=${RUN_ID}"
  echo "created_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
} > "${TARGET}/.release-id"

PREVIOUS=""
if [ -L "${REL}/current" ]; then
  PREVIOUS="$(readlink -f "${REL}/current")"
fi

if [ -d "${APP}" ] && [ ! -L "${APP}" ]; then
  LEGACY="${REL}/release-legacy-$(date -u +%Y%m%dT%H%M%SZ)"
  mv "${APP}" "${LEGACY}"
  date -u +%Y-%m-%dT%H:%M:%SZ > "${LEGACY}/.release-ok"
  PREVIOUS="${LEGACY}"
  echo "Saved the previous site as ${LEGACY}"
fi

mkdir -p "$(dirname "${APP}")"
if ! switch_to "${TARGET}"; then
  echo "Could not start the new site" >&2
  if [ -n "${PREVIOUS}" ]; then
    switch_to "${PREVIOUS}" || true
  fi
  exit 1
fi

if ! health "${SHA}"; then
  echo "New site failed the health check" >&2
  if [ -n "${PREVIOUS}" ]; then
    echo "Putting the previous site back"
    switch_to "${PREVIOUS}" || true
    health "Panacea IT Services" || echo "Previous site also failed the health check" >&2
  fi
  exit 1
fi

assert_others_unchanged

current_real="$(readlink -f "${REL}/current")"
find "${REL}" -mindepth 1 -maxdepth 1 -type d -name 'release-*' -printf '%T@ %p\n' \
  | sort -nr | awk 'NR>5 {print $2}' | while read -r dir; do
    if [ "$(readlink -f "${dir}")" = "${current_real}" ]; then
      continue
    fi
    rm -rf "${dir}"
  done

pm2 save
echo "Live release ${TARGET}"
