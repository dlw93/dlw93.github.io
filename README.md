# dlw93.github.io

This is the source code for my personal website, [dlw93.github.io](https://dlw93.github.io/).

## Download

On the [website](https://dlw93.github.io/), press <kbd>Ctrl</kbd> + <kbd>P</kbd> (<kbd>Command</kbd> + <kbd>P</kbd> on macOS) to open the browser's print dialog and create a distributable PDF file or download the latest version from [here](https://github.com/dlw93/dlw93.github.io/releases/latest/download/CV_en.pdf).

## Build

To bundle the various JavaScript source files into a single minified file, run

    npx webpack-cli --mode production --experiments-top-level-await ./src/app/index.js
