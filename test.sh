#!/usr/bin/bash

mkdir -p dist/test/es5
babel --out-dir dist/test/es5 test &&
browserify dist/test/es5/*.js -o dist/test/main.js &&
cp test/test.html dist/test && 
echo "tests will run in chrome. if chrome doesn't exit the tests have failed" &&
"C:\Program Files (x86)\Google\Chrome\Application\chrome" dist/test/test.html &&
echo "tests passed :-)"
