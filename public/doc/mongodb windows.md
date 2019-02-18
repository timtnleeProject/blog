# 本機安裝 mongoDB (windows)

紀錄如何在本機安裝 mongoDB (windows) 以及簡易使用。

## 下載 mongoDB server

到[mongodb官網][1]下載 mongoDB community server.

!["not found"](images/mongodb/download.jpg)

安裝路徑可以選自己偏好的，預設在 `C\Program Files`

## 設定

參考[官網步驟][2]，需要設定 DB File storage 的路徑，預設是在 `\data\db`

其中一種方式是在 mongoDB 裡的 data 資料夾下指令

```bash
md \data\db
```

## 運行

打開 mongodb 資料夾 `MongoDB\Server\4.0\bin` 可以看到幾個應用程式 (.exe)

![""](images/mongodb/exe.jpg)

* mongod.exe: 運行mongodb
* mongo.exe : 可連接 mongoDB 的 shell

執行 mongod.exe 如果正常運行，便可開啟 mongo.exe 來下指令操作了

## 基本指令

指令在[這裡][3]有教學，這邊就先試一些簡單的指令。

### 查看所有的 DB

可以看到有三個預設的 DB

```bash
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

### 切換、新增 DB

use <DB Name> 可以切換至該 DB，如果 DB 不存在就創建一個新的，創建一個名為 test 的 DB

```bash
> use test
switch to db test
```

### Create Collection

```bash
> db.createCollection("first",{})
{ "ok" : 1 }
```

### 查看 Collections

```bash
> show collections
first
```

### Insert Document

```bash
> db.first.insert({nema:'time',score:100})
WriteResult({ "nInserted" : 1 })
```

## GUI

只使用 shell 還是有些不方便，有許多支援 mongoDB 的 GUI Tools 可以使用。

### Robomongo

參考[這篇][4]，我使用 Robomongo Robo 3T。[官網][5]下載安裝完成之後便可使用。

先新增連線，如果安裝mongodb時沒有特別設定 (port,password) 就用 default 即可。
![""](images/mongodb/connection.jpg)

連線之後就可以看到 DB，並且可以直接更改 document 和對 DB 進行操作
![""](images/mongodb/roboto.jpg)

[1]:https://www.mongodb.com/download-center/community
[2]:https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/#set-up-the-mongodb-environment
[3]:https://www.tutorialspoint.com/mongodb/index.htm
[4]:https://medium.com/@wilsonhuang/robomongo-%E5%A5%BD%E7%94%A8%E7%9A%84-mongodb-gui-manager-87508da806e5
[5]:https://robomongo.org/download