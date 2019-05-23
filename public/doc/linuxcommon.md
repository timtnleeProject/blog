# Linux, Ubuntu 常用指令

Linux, Ubuntu 常用指令

## Ubuntu

### 確認系統更新

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

## Ufw (防火牆)

啟動規則

```bash
sudo ufw allow http
# or
sudo ufw allow 80
```

刪除規則

```bash
sudo ufw delete allow 80
```