#!/usr/bin/env bash
cp ./package.json ./dist/
cp ./README.md ./dist/
cp ./.npmignore ./dist/

npm pub ./dist/
