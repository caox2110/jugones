#!/bin/bash

cd dist
echo "[" >ws-deps.json
for f in *.*; do
    if [[ ($f == *".html"* || $f == *".js"* || $f == *".css"*) && ($f != *".map"* && $f != *".json"* && $f != *"sw.js"* && $f != *"runtime"*) ]]; then
        echo "\"/${f}\"," >>ws-deps.json
    fi
done
echo "\"/\"" >>ws-deps.json
echo "]" >>ws-deps.json
