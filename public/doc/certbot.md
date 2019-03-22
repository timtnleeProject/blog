# 為網站加上 SSL 防護

延續[Run a NodeJS Application on Linode](/#/article/nodeapponlinode)使用 [Let's Encrypt](https://letsencrypt.org/getting-started/) 這個免費的 SSL 認證機構進行認證。並用 [Certbot](https://certbot.eff.org/) 這個 ACME client 來幫助自動認證、發行和安裝。

真的超方便....一鍵安裝

## Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/about/) 是一個免費、自動化的 CA 認證服務。由 [ISRG](https://www.abetterinternet.org/) 這個組織提供。

## CertBot

使用這個 Agent 幫助自動化向 Let's Encrypt 驗證主機並安裝憑證。

安裝步驟請參考[這裡](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) (linux distribution: Ubuntu 18/Web server: nginx)

```bash
sudo certbot --nginx
```

執行這個指令 certbot 會產生公司鑰並向 CA 進行主機、鑰的認證。CA 會有一連串的步驟來確認這個主機確實擁有這對鑰。

另外以上指令還會自動幫你安裝憑證，去修改 nginx 的 config，使之套用 ssl 設定。假設不想 certbot 自動調整 nginx config 的話，可以執行下面指令，只進行授權認證，不幫你修改 web serve config：

```bash
sudo certbot --nginx certonly
```

### 步驟

> 注意你的 nginx config (`/etc/nginx/sites-enabled/default`) 裡面需要有 server_name 這個 directive，certbox 才知道你的 server 對應的 DNS 名稱是什麼。

![404](images/certbot/servername.png)

執行

```bash
sudo certbot --nginx
```

選擇哪個 DNS (根據你的 nginx config 去 parse 的) 要發行 SSL

![404](images/certbot/one.png)

如果首次執行應該會問你 Email，憑證即將 Expire 時會通知，下面這個畫面因為我已經申請發布過憑證，因此他詢問是要重新安裝還是重新發布替換憑證 (這張圖應該選 1 就好選錯了)。

![404](images/certbot/two.png)

最後會問 web server 的設定方式，是否將 http 請求都導向 https？

![404](images/certbot/three.png)

然後就完成設定了!

去查看 nginx config 可以看到 ssl 設定已經被加上去

![404](images/certbot/ssl.png)

http 導向 https:

![404](images/certbot/redirect.png)

最後記得去把 port 443 開啟，因為 https 是走 443 port。

```bash
sudo ufw allow https
```

大功告成!

![404](images/certbot/https.png)

## 小心得

現在的工具真的越來越方便，一鍵就可以幫你完成可能十個步驟，以前都要手動自己土法煉鋼。

我甚至不太清楚中間過程經歷，整個設定就完成了。。

也許這就是 CI/CD 開始紅的原因吧？ 有了這些大大小小的自動化工具，如果加以結合會節省非常多人工的付出。

而在這個有一堆自動完成的工具的時代，我們是否還需要去了解其中的原理呢，我覺得很值得思考。