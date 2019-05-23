# passport google Oauth 2.0

有關 Oauth 的觀念和原理可去看阮一峰的[理解Oauth2.0](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)

大概重點如下

* client (application) 要向 service (例如 google, fb) 認證
* 設置一層授權層(authorization layer)，client 不能直接登入 service，而是使用 token 登入授權層，和使用者密碼不同。
* 流程
  * client 將客戶導向 service 頁面並附上 client id 以識別
  * 客戶同意授權 => 導回 client 並附上 code
  * client 後端向 service 請求 token (附上 code, client id, client secrert)
  * 返回 token，client 可存取服務

## Google API Console

首先要到 Google API console 申請一個 project (如果你還沒有的話)，和一組 Oauth 用戶端使用的憑證

![404](images/passportgoogleauth/apiconsole.jpg)

點進去可看到詳細資訊

![404](images/passportgoogleauth/secret.jpg)

需要設定應用程式的 Redirect URL 來獲得授權認證，不是單純網域就好而是要詳細到重導網址

![404](images/passportgoogleauth/redirect.jpg)

## passport 流程

在 passport 設定 google 認證策略

提供 google client 資訊

```javascript
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE.CLIENTID,
  clientSecret: config.GOOGLE.CLIENTSECRET,
  callbackURL: 'http://127.0.0.1:3000/session/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile)
}))
```

設定登入的 url

```javascript
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
)
```

進入此 url 會導向 google 認證畫面

![404](images/passportgoogleauth/google.jpg)

在認證使用者後會導向 `/session/google/callback`，帶回 code，繼續進行認證以取得 token

`/session/google/callback` middleware :

```javascript
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)
```

我設定顯示 google 帶回來的使用者資訊

![404](images/passportgoogleauth/userinfo.jpg)
