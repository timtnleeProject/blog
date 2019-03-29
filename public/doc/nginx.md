# Nginx

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

## 其他

### 重啟服務

```bash
sudo service nginx restart
```