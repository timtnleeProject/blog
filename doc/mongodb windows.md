# 本機安裝 MongoDB (windows)

紀錄如何在本機安裝 mongoDB (windows) 以及簡易使用。

## 下載 mongoDB server

到[mongodb官網][1]下載 mongoDB server，看你要 community 還是 Enterprice 版本。

!["not found"](images/mongodb/download.jpg)

安裝路徑可以選自己偏好的，預設在 `C\Program Files\MongoDB`

如果勾選 *install as a service* 則安裝之後可以用 windows 服務來啟動和停止。

![404](images/mongodb/install.jpg)

## 設定

### Normal setting

參考[官網步驟][2]，DB File storage 的路徑預設是在 C 槽的 `\data\db`

可以直接創建該資料夾後執行 mongod.exe

```bash
cd C:\
md \data\db
```

或是想要使用別的 data path

```bash
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath "d:\test\mongo db data"
```

### As a Windows Service

如果剛剛安裝選擇 Install as a Windows Service 的話，可以照以下步驟設定：

安裝服務

```bash
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg" --install
```

可在 mongod.cfg 裡設定 logPath 和 dbPath

完成後可使用 windows 服務開啟

![404](images/mongodb/mservice.jpg)

或使用指令

```bash
net start MongoDB
net stop MongoDB
```

打開 mongodb 資料夾 `MongoDB\Server\4.0\bin` 可以看到幾個應用程式 (.exe)

![""](images/mongodb/exe.jpg)

* mongod.exe: mongodb server
* mongo.exe : 可連接 mongoDB 的 shell

如果 MongoDB 正常運行，便可開啟 mongo.exe 來下指令操作了

我是使用 windows service 的方式，可以看到 mongoDB server 正在運行
![""](images/mongodb/service.jpg)

發現重開機的時候 mongoDB 會自己啟動，可以從 windows 的服務改成手動啟動。

另外**也可以將 mongo.exe 和 mongod.exe 的路徑加入環境變數 path，方便在 cmd 直接呼叫**。

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

`use <DB Name>` 可以切換至該 DB，如果 DB 不存在就創建一個新的，創建一個名為 test 的 DB

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

### MongoDB Compass

有 Schema 分析功能非常好用

![404](images/m001ch1/schema.jpg)

在[這篇](#/article/m001ch1)有介紹，我現在是使用 Compass。

[1]:https://www.mongodb.com/download-center/community
[2]:https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/#set-up-the-mongodb-environment
[3]:https://www.tutorialspoint.com/mongodb/index.htm
[4]:https://medium.com/@wilsonhuang/robomongo-%E5%A5%BD%E7%94%A8%E7%9A%84-mongodb-gui-manager-87508da806e5
[5]:https://robomongo.org/download