# Babel 7 Basic

整理 babel7 的一些觀念和設定

## Webpack & Babel

webpack 是一個 bundler，也就是打包的工具，解決**模塊**問題以及**打包**各種資源無論是 js,css 甚至圖片。

而 babel 是一種**編譯** js 程式碼的工具，webpack 編譯 js 檔案時會用到 babel-loader。這篇著重在 babel 介紹。

## Install @babel/core, @babel/cli

安裝 @babel/core 和 @babel/cli

```bash
npm install --save-dev @babel/core @babel/cli
```

**@babel/core** 包含了轉換程式碼的方法，可以以 API 形式呼叫：

```javascript
require("babel-core").transform("code", options);
```

**@babel/cli** 則是 babel 的 command line tool

我們便可以開始使用 babel cli 來編譯我們的檔案，假設要編譯 `index.js` 產出 `compiled.js` 下列三種方法可以使用 local package cli

### Point to binaries (executables) from your node modules are located

```bash
.\node_modules\.bin\babel index.js --out-file compiled.js
```

### npm script

執行 npm script 時會新建一個 shell，將 node_modules\.bin 加入環境變數 PATH，結束之後再刪除。

```javascript
//package.json
{
    "name": "my-project",
    "version": "1.0.0",
    "scripts": {
      "build": "babel index.js --out-file compiled.js"
    }
    //...
}
```

```bash
npm run build
```

### Use npx prefix

```bash
npx babel index.js --out-file compiled.js
```

## Plugins

*index.js*

```javascript
const a = ()=>1
```

當我們運行 `babel index.js --out-file compiled.js`後

*compiled.js*

```javascript
const a = () => 1;
```

只是加了一些空格和分號而已，babel並不會做任何其他轉換。

我們需要的是加入 **plugins**，代表你要編譯的項目。例如我們需要將箭頭函式轉為普通 function，需要 *@babel/plugin-transform-arrow-functions* 這個插件。

```bash
npm install --save-dev @babel/plugin-transform-arrow-functions
```

使用 plugins

```javascript
babel index.js --out-file compiled.js --plugins=@babel/plugin-transform-arrow-functions
```

*compiled.js*

```javascript
const a = function () {
  return 1;
};
```

可以看到箭頭函示被轉換了

## .babelrc

可以在專案根目錄新增 .babelrc 檔案，babel 會套用這份設定

*.babelrc*

```javascript
{
    "plugins": [
        "@babel/plugin-transform-arrow-functions"
    ]
}
```

就不用把參數都打在指令中

```bash
babel index.js --out-file compiled.js
```

## Presets

presets 就是許多 plugins 的組合包，讓你不用一個一個去下載設定。

像是最常用的 @babel/preset-env

```bash
npm install --save-dev @babel/preset-env
```

@babel/preset-env 的一個特色是可以用 target 的方式來自動幫你設定好需要的插件，你只要決定你想要 supprot 的瀏覽器版本或是其他環境。

*.babelrc*

```javascript
{
    "presets": [
      ["@babel/preset-env", {
        "targets": {
          "browsers": ["last 1 Chrome versions"]
        }
      }]
    ]
}
```

## Polyfills

前面這些轉換都只是語法的轉換，比如 es-2016 語法轉換成 es-2015。

但如果該環境根本沒有某些物件或是方法，這時就需要 polyfill。

例如 IE 沒有 Promise，就在 Global 域自己定義一個 Promise。

這邊加上 webpack 來打包成瀏覽器的 script 比較好理解。

將 index.js 程式碼更改如下

*index.js*

```javascript
import path from "path";

console.log(__dirname)

const a = ()=>new Promise((res,rej)=>{
  setTimeout(()=>{
    res(path.resolve(__dirname,"index.js"))
  },1000)
})

a().then(res=>{
  console.log(res)
})
```

下載 webpack，新增 webpack.config.js

*webpack.config.js*

```javascript
const path = require('path')

module.exports = {
  mode: "development",
  entry: './index.js',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname)
  }
}
```

使用 webpack 將模塊化的程式碼打包後在 index.html 引用並用 IE 開啟

*index.html*

```html
<script src="dist.js"></script>
```

IE 會提示 *語法錯誤*，這是因為不支援箭頭函式，我們加入 babel-loader 來編譯

下載 babel-loader 後修改 webpack.config.js，使用 babel 轉換 js，並使用 presets。

*webpack.config.js*

```javascript
const path = require('path')

module.exports = {
  mode: "development",
  entry: './index.js',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname)
  }
  ,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

再次編譯後，箭頭函式被轉換了，但此時 IE 出現另一個錯誤

![404](images/babel/promise.jpg)

因為 IE 瀏覽器並沒有 Promise 這個物件，我們需要 polyfill，可以在 @babel/preset-env 設定的 useBuiltIns 設為 "usage" 或是 "entry" 便可以自動引入 @babel-polyfill，不需要在入口文件導入。

```javascript
//...
module: {
  rules: [
    {
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            targets: {
              browsers: ["IE >= 9"]
            },
            useBuiltIns: "usage"
          }]],
        }
      }
    }
  ]
}
```

P.S. 光是加上 Promise polyfill 打包文件就從原本 18kb 變成 72kb...

## 參考

其他像是 babel-runtime, babel-register 等可以參考下面，我懶了...QQ

* [https://blog.zfanw.com/babel-js/](https://blog.zfanw.com/babel-js/)
* babel 官網