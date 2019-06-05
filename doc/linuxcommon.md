# Linux, Ubuntu 常用指令

Linux, Ubuntu 常用指令
1234
123

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

## crontab

* crontab -e 編輯排程
* crontab -r 移除排程(這個會全部移除，要修改或移除單筆要使用編輯)
* crontab -l 顯示目前排程
* crontab -u 改變排程的執行身分

### crontab 指令

[測試指令: crontab.guru](https://crontab.guru/)

分鐘 小時 日 月 星期 執行身份 指令

```bash
# 每五分鐘執行一次
*/5 * * * * root /usr/libexec/atrun
```

## shell script

### 變數型態

-a  ：定義為陣列 array
-f  ：定義為函數 function  
-i  ：定義為整數 integer
-r  ：定義為唯讀
-x  ：定義為透過環境輸出變數

`declare -i a=3`

### If else

```bash
# 注意要空格!
# 錯誤:
if ["y"="0"];then
  echo "$y"
# 正確:
if [ "y" = "0" ]; then
  echo "$y"
else if [ 條件二 ]; then
  內容二
else
  內容三
fi
```
