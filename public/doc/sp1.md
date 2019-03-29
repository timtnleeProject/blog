# Side Project No.1: authentication using koa & passportjs

練習 login 認證機制，練習使用 koa 這個框架 (以往都用 express)，認證使用 passportjs。

## Installation & Initialize

### babel

想要使用 es-module 來開發，因此需要 babel 編譯

#### 安裝

```bash
npm install -D @babel/core @babel/cli
```

#### 新增 build 指令

轉換整個資料夾 (src => lib)

package.json

```javascript
//...
"scripts": {
    "build": "babel src --out-dir lib",
    //...
}
```

#### 加入 babel preset

```bash
npm install -D @babel/preset-env
```

新增 `.babelrc`

```javascript
{
    "presets": ["@babel/preset-env"]
}
```

再度編譯，可以看到轉換 es-module

```javascript
// 原始
import fs from 'fs'

// 編譯後
"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

#### babel-watch

安裝 babel-watch (nodemon + babel-node 合體，提供良好的重載機制)，開發階段使用 (總不能每次更改都編譯一次檔案)

```bash
npm install -D babel-watch
```

新增 npm script

```javascript
//...
"scripts": {
    "dev": "babel-watch src/index.js",
    //...
}
```

### koa

```bash
npm install --save koa
```

### passport

passport 原本設計是 express 的 middleware，要在 koa 使用需安裝 koa-passport

```bash
npm install --save koa-passport
```

### eslint

因為我有裝 eslint global package，你也可以裝本地使用

在專案跟目錄執行

```bash
eslint --init
```

code style 我選擇 standard

## Koa setup

### server

```javascript
// app.js
import Koa from 'koa'

const app = new Koa()

app.use(ctx => {
  ctx.body = 'response' // set response body
})

export default app

// -----------------------------
// index.js
import app from './app.js'

app.listen(3000)

```

### router

我使用 [koa-router](https://github.com/ZijianHe/koa-router)

可以使用 [nested routers](https://github.com/ZijianHe/koa-router#nested-routers)來拆分子 router

我新增一個資料夾 `routers`，裡面存放子 routers，其中 index.js 合併這些 routers

```text
|_routers
  |_ index.js
  |_ session.js
  |_ user.js
```

#### session.js

```javascript
import Router from 'koa-router'

const router = new Router({ prefix: '/session' })

router.get('/', ctx => {
  ctx.body = 'session'
})

export default router

```

#### user.js

```javascript
import Router from 'koa-router'

const router = new Router({ prefix: '/user' })

router.get('/', ctx => {
  ctx.body = 'user'
})

export default router

```

#### index.js

合併子 router

```javascript
import Router from 'koa-router'
import session from './session'
import user from './user'

const router = new Router()

router.use(
  session.routes(),
  user.routes()
)

export default router

```

#### app.js

並在 app.js 使用

```javascript
import Koa from 'koa'
import router from './routers/index.js'

const app = new Koa()

app.use(router.routes())

export default app

```

可以看到 routes 規則正確套用

![404](images/sp1/route.png)

