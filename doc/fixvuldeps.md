# Vulnerability dependencies

遇到 Vulnerability dependencies 問題

## Vulnerability alert

Github 會自動偵測有資安漏洞的 dependencies 並提醒你更新

![404](images/fixvuldeps/warn.jpg)

可以看到 tar 這個模組低於 4.4.2 版本有什麼樣的安全弱點。

![404](images/fixvuldeps/warndetail.jpg)

## 找到源頭

但 tar 並非我們專案的 dependencies

可以下指令 `npm ls <pakage>` 來查看是什麼模組引用了 tar

```bash
$npm ls tar
vuejs-clipper@0.2.12 C:\Users\User\Desktop\SYSCOM(C)\vuejs-clipper
+-- node-sass@4.12.0
| `-- node-gyp@3.8.0
|   `-- tar@2.2.1
`-- webpack-dev-server@3.1.14
  `-- chokidar@2.1.0
    `-- UNMET OPTIONAL DEPENDENCY fsevents@1.2.9
      `-- UNMET OPTIONAL DEPENDENCY node-pre-gyp@0.12.0
        `-- UNMET OPTIONAL DEPENDENCY tar@4.4.8
```

可以看到 webpack-dev-server 已經使用最新的 tar，
因此問題出在 node-sass -> node-gyp -> tar

也可以使用新的 `npm audit` 來查看 vlnerability dependencies

![404](images/fixvuldeps/audit.jpg)

我們無法用 update 或是 audit 來修正，
因為 node-gyp 和 node-sass 都尚未修正更新

去看看 node-gyp 的[相關 issue](https://github.com/nodejs/node-gyp/pull/1713)

node-sass 同樣為此所苦...表示我們[正在嘗試，別再PR了!](https://github.com/sass/node-sass/issues/2625)

等到這兩個庫修正弱點問題，我們再來更新專案就可以了。

## 修正

在相關模組發布新版之後可以使用 `npm audit fix` 來修正了

但是 github 還是會顯示 alert，因為pacakge.lock.json 的其他仍有使用低版本的 tar

參考這個方法

![404](images/fixvuldeps/resolve.jpg)

手動將 `package.lock.json` 需要修正的依賴從 requires 搬到 dependencies 並手動更改版本。

然後刪除 node_modules，重新 `npm install`，`npm audit`測試

完成後 github 就不會有警告了