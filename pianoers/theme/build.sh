#!/bin/sh
# Builds the shipped (minified) theme assets from the readable sources in src/.
# Edit src/screen.css and src/main.js, never the files in pianoers/assets/ (they are overwritten).
# Usage: sh build.sh        (needs Node; first run downloads esbuild)
set -e
cd "$(dirname "$0")"
ESBUILD="npx -y esbuild@0.25.0"
$ESBUILD src/screen.css --minify --target=chrome100,safari15,firefox100 --outfile=pianoers/assets/css/screen.css --log-level=warning
$ESBUILD src/main.js --minify --target=es2018 --outfile=pianoers/assets/js/main.js --log-level=warning
rm -f pianoers.zip
(cd pianoers && zip -qr ../pianoers.zip . -x '.*')
ls -l pianoers/assets/css/screen.css pianoers/assets/js/main.js pianoers.zip | awk '{print $5, $9}'
