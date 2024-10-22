#!/bin/sh

npx babel src --out-dir dist --extensions '.ts' && node dist/index.js
