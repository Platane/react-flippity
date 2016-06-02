#!/bin/sh

# build examples
npm run build:examples

# deploy examples to gh pages
cd ./dist
git init
git config user.name "Travis CI"
git config user.email "me@platane.me"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
cd ..
