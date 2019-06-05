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

### Body parser

bady parser 處理 post body。

[文件](https://github.com/dlau/koa-body#usage-with-koa-router)表示和 koa-router 一起使用，可以在需要的 routes 再呼叫 koa-body 中間介

```javascript
router.post('/users', koaBody(),
  (ctx) => {
    console.log(ctx.request.body);
    // => POST body
    ctx.body = JSON.stringify(ctx.request.body);
  }
);
```

### Session

[koa-session](https://github.com/koajs/session)

### Static files

[koa-static](https://github.com/koajs/static)

預設的 filename 是 index.html，可用 options.index 更改

## Passport

passportJS 原本是以 Express 中間介形式設計，要在 koa 使用要下載 [koa-passport](https://github.com/rkusa/koa-passport)。

### Strategy

passport 有很多 strategy (認證方式) 可以使用，這些都是套件需要另外安裝。

我們先來簡單試試 local strategy (使用帳密登入)

```javascript
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'

const fakeUser = {
  username: 'tim',
  password: '12345',
  level: 20
}

passport.use(new LocalStrategy(
  function (username, password, done) {
    if (username !== fakeUser.username) return done(null, false)
    if (password !== fakeUser.password) return done(null, false)
    done(null, fakeUser)
  }
))

export default passport
```

然後在 session router 使用

```javascript
import Router from 'koa-router'
import koaBody from 'koa-body'
import passport from '../passport/local'

const router = new Router({
  prefix: '/session'
})

// init passport middleware
router.use(passport.initialize())

router.post('/',
  koaBody(),
  (ctx, next) => {
    console.log(ctx.request.body)
    next()
  },
  passport.authenticate('local', { session: false }),
  (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = 'success'
  }
)

export default router
```

`passport.authenticate` 使用對應的 strategy, 如果驗證成功，預設會將 user 資訊加到 `ctx.state.user`，並繼續執行後面的中間介。

失敗則回應 `401 Unauthorized`。

可以傳入 `successRedirect`, `failRedirect` 來導向，或是在 middleware callback 中呼叫 `passport.authenticate` 而非當成中間介使用，來進行更多操作。

### establish session

如果你要使用 session，passport 使用 serialize 決定將甚麼資訊存在 cookie (這裡使用 id)，當 cookie 存在時會用 deseialize 來找尋對應使用者資訊，存到 `req.user` (koa-passport 存在 `ctx.state.user`)

```javascript
// 此為範例示意
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

### 完整流程

我們來看在 `/session` 這個子 router 內的完整流程：

#### 初始化

首先 passport 會初始化，並且我們使用 session 檢查 user 因此需要 `passport.session` middleware 初始化 (當然我們在更之前已經先設定好 `koa-session` middleware)

```javascript
router.use(passport.initialize())
router.use(passport.session())
```

#### 登入

```javascript
router.post('/',
  koaBody(),
  passport.authenticate('local', { session: true }),
  function (ctx, next) {
    console.log('user:', ctx.state.user)
    ctx.body = 'success'
  }
)
```

passport 會使用 local strategy 來驗證 `ctx.request.body` 內的使用者資訊。
這裡預設行為成功會繼續執行下個 middleware，失敗返回 `401 Unauthorized`
然後我不確定這邊要不要手動呼叫 `ctx.login(ctx.state.user)` 因為貌似他已經自動將使用者資訊塞進 session 了，passport 會使用我們之前已經定義好的 `serializeUser` 邏輯來將 user 資訊存進 session。

#### 檢查 session

因為我們有使用 `passport.session()` 這個 middleware，如果 session 已經含有使用者資訊，passport 會自動做一些處理

```javascript
router.get('/', ctx => {
  console.log('session:', ctx.session) // 這是原本的 session
  console.log('state:', ctx.state.user) // passport 塞的
  console.log('isAuth:', ctx.isAuthenticated())
  console.log('unAuth:', ctx.isUnauthenticated())
  ctx.body = 'session'
})
```

其中 passport 會使用我們之前定義的 `deserializeUser` 邏輯來將 user 資訊加到 `ctx.state.user` (如果是 express 則是 `req.uesr`)

並且提供 `isAuthenticated()` 和 `isUnauthenticated()` 兩個方法來檢查使用者是否已經登入 (有 session)

#### 登出

passport 在 ctx 附加的 `logout` 方法可以清除 session 的 passport 使用者資訊

```javascript
router.delete('/', async ctx => {
  await ctx.logout()
  ctx.body = 'logout'
})
```

## 測試登入頁面

### 靜態路由

使用 `koa-static` 靜態路由

```javascript
import staticRoute from 'koa-static'

// app is the Koa instance
// static
app.use(staticRoute(path.resolve(__dirname, '../public')))
```

### webpack proxy

如果我們同時開發另一個 spa，例如使用 vue-cli，開發時 port 不同會有 CORS 的問題
可以用 webpack devServer 的 proxy 設定解決
此例前端為 8080，後端為 3000

*vue.config.js*

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000'
      }
    }
  }
}
```
