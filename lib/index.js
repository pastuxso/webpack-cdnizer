/**
 * Created by jialiu on 17/1/4.
 */

"use strict"

const cdnizerFactory = require("cdnizer")

function CdnizerWebpackPlugin(options) {
  // Setup the plugin instance with options...

  this.options = Object.assign({
    defaultCDNBase: options.defaultCDNBase || '//localhost:5050/', // 默认cdn
    relativeRoot: options.relativeRoot || '',
    files: options.files || ['**/*.{gif,png,jpg,jpeg}','**/*.js','**/*.css'],
    assetsSubDirectory:options.assetsSubDirectory || 'static',
    jsReg:  options.jsReg || /\S+app\S+.js$/g

  }, options);
}

CdnizerWebpackPlugin.prototype.apply = function(compiler,callback){
  let cdnizerCss = cdnizerFactory(this.options);
  compiler.plugin('emit', (compilation, callback) =>{
    // Create a header string for the generated file:
    for (let filename in compilation.assets) {

      let _child= compilation.assets[filename].children ? compilation.assets[filename].children[0]:compilation.assets[filename]

      if(new RegExp(this.options.jsReg).test(filename)){
        let jsReg=new RegExp(this.options.assetsSubDirectory+"\\S+.(png|jpg|jpeg|gif)",'g');
        _child._value=_child._value.replace(jsReg,
           (str) => this.options.defaultCDNBase+str
          )
      }
      if(new RegExp(/^\S+.css$/g).test(filename))
      {
        _child._value=cdnizerCss(_child._value)
      }
    }

    if (!compilation.assets['index.html']) {
      callback();
      return;
    }

    let oldHtml= compilation.assets['index.html'].source(),
      newHtml=cdnizerCss(oldHtml)

    compilation.assets['index.html'] = {
      source: function() {
        return newHtml;
      },
      size: function() {
        return newHtml.length;
      }
    };
    callback();
  });
}

module.exports=CdnizerWebpackPlugin;
