#!/usr/bin/env bash
# Builds the static site with the GitHub Pages base path and publishes
# the contents of out/ to the gh-pages branch.
set -euo pipefail

REPO_URL="https://github.com/muteesdesign-sketch/waba-grill.git"
BASE_PATH="/waba-grill"
PAGES_URL="https://muteesdesign-sketch.github.io/waba-grill/"

echo "▶ Building static site (basePath=${BASE_PATH})…"
NEXT_PUBLIC_BASE_PATH="${BASE_PATH}" npm run build

echo "▶ Publishing out/ to gh-pages…"
cd out
touch .nojekyll
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.email="juan@3owl.agency" -c user.name="Juan Rojas" \
  commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git push -q -f "${REPO_URL}" gh-pages
rm -rf .git

echo "✓ Deployed → ${PAGES_URL}"
