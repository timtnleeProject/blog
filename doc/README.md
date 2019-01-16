# About this blog

Vuejs 靜態部落格

## 特色

* 不須額外編譯建置，可直接使用 github 新增修改文章、部分客製化設定
* 文章語法使用 markdown
* 我還沒想到

## 文章

* 文章存放路徑: `/doc`， 直接在此資料夾修改或新增文章
* 文章一律使用 markdown 格式
* **文章第一行必須為大標題 `# 你的標題`，以便預覽頁順利呈現**

### 文章清單

文章清單為 `list.json` 紀錄文章的資訊， 結構如下：

```javascript
{
  "tags": ["project","life","Mental Health"], //這是所有的tag, 搜尋會用到
  "articles": [  //這是所有的文章
    {
      "name":"example",  // 文章的檔名(不包含.md副檔名)
      "date": "2019/1/16", //文章的日期
      "tags":["project"]   //文章的標籤
    },
    {
      "name":"trip",
      "date": "2019/1/10",
      "tags":["project","life"]
    },
    {
      "name":"ex2",
      "date":"2019/1/14",
      "tags":["Mental Health"]
    }
  ]
}
```

### 新增文章

新增文章至 `/doc` 資料夾後，需在文章清單 (`list.articles`) 加入文章資訊

### 新增標籤

需在文章清單 (`list.tags`) 加入標籤資訊

### 引用圖片

圖片存放位置 `/images` 資料夾

上傳圖片後可在 markdown 中引用

```markdown
![""](images/your_images.jpg)
```

注意如果圖片檔名含有特殊字元，需使用 URL Encoding

例如圖片為 `my pic.jpg`，引用方式：

```markdown
![""](images/my%20pic.jpg.jpg)
```

## 客製化

### 屬性、文字設定

設定檔在 `setting.js`，可直接更改

### 色系

可在 `css/theme.css` 中更改 css 變數

```css
:root {
  --color-dark: #1e2022; /* 深色*/
  --color-main: #52616a; /* 主要顏色*/
  --color-sub: #c9d6de;  /* 副色*/
  --color-light: #f0f5f9;/* 亮色*/
  --color-special: #0099CC; /* 特別顏色*/
}
```