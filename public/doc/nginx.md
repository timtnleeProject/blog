# Nginx & linux

nginx 指令、設定整理

## Config 相關

config 檔案路徑: `/etc/nginx/sites-enable/default`

### 檢查 config

```bash
sudo nginx -t
```

### 隱藏版本資訊

`server_tokens off;`

### serve static files

`root /var/www/html;`

### 導向其他 ap

導向開在 port 3000 的應用，並將 path 一併傳遞

```javascript
location / {
    proxy_pass http://139.162.55.7:3000$request_uri;
}
```

## 其他

### 重啟服務

```bash
sudo service nginx restart
```
