#!/usr/bin/bash

mkdir -p dist/demo
ls -ld node_modules/babel*
babel --out-dir dist src &&
browserify dist/demo.js -o dist/demo/demo.js && 
browserify dist/react-proactive-accordion.js -o dist/demo/react-proactive-accordion.js &&
cp src/demo.html dist/demo && 
cp src/*.css dist/demo

