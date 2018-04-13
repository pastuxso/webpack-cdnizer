# webpack-cdnizer
a webpack plugin for cdnizer

Webpack-cdnizer is an auto cdnizer webpack plugin based on cdnizer.This library will replace local file references in HTML and other files with CDN locations. This allows you to work with local copies of libraries during development, and then automate switching to your CDN version when you deploy your application.

## install and use

npm install --save-dev webpack-cdnizer

var CdnizerWebpackPlugin = require('webpack-cdnizer')

## options.assetsSubDirectory

The base directory you place assets,for js img replace,default is static.

## options.jsReg

RegExp for js,for default is /\S+app\S+.js$/g. We assume that you have two packed js,app and vendor.So we can only find in app.js.


See more details and options,look at [cdnizer](https://github.com/OverZealous/cdnizer).

