# Babel7 Basic

整理 babel7 的一些觀念和設定

## Webpack & Babel

webpack 是一個 bundler，也就是打包的工具，處理打包模塊(各種資源無論是 js,css 甚至圖片)，主要用在前端 (瀏覽器)，當然可以設 target: node 編譯成 node讓你的前端開發可以用模塊化的方式開發後打包成瀏覽器能使用的檔案

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