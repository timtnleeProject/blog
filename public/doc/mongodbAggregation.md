# MongoDB Aggregation

Mongodb Aggregation (聚合) 提供更多靈活和複雜的邏輯流程處理，如果單純用 query operators 無法達成需求就要試試 aggregation了。

## 概述

可參考[官網](https://docs.mongodb.com/manual/aggregation)

Aggregation 採用 pipeline 的處理方式轉換 documents (有點類似 rxjs pipeline)。

Aggregation 基本上不會對 collection 進行操作 (Write, delete, update) 除非你使用某些 aggregation operators。

## 將 A field 的值設為 B field 的值

我有一個 collection，其中欄位 isVertified 拼錯了...應該是 isVerified 才對

![404](images/mongodbAggregation/originData.jpg)

要將 isVertified 改為 isVerified

(使用 mongo shell) 首先看看

```javascript
db.collection.aggregate([
  {
    "$addFields": {
      "isVerified": "$isVertified"
    }
  }
])
```

會出現聚合後的結果：

![404](images/mongodbAggregation/pipedata.jpg)

$addFields 可以新增 (還沒動到 collection，只是 pipeline 的 data) 欄位，並使用其他欄位的值來運算

先使用 $projection 篩掉不要的欄位 isVertified

再使用 [$out](https://docs.mongodb.com/manual/reference/operator/aggregation/out/) 可以將聚合結果寫入特定 collection

```javascript
db.collection.aggregate([
  {
    "$addFields": {
      "isVerified": "$isVertified"
    }
  },
  {
    "$projection": {
      "isVertified": 0
    }
  },
  {
    "$out": "collection"
  }
])
```

完成：

![404](images/mongodbAggregation/afterdata.jpg)