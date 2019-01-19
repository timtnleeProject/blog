# Blog

Vuejs 靜態部落格

[Demo](https://timtnleeproject.github.io/blog/#/)

## 特色

* 不須額外編譯建置，可直接使用 github 在 gh-pages 分支新增修改文章、部分客製化設定
* 文章語法使用 markdown
* Syntax highlight (Prism)
* 我覺得版面還不錯
* 第五點我還沒想到

## Repository

### braches

* master: merge 最近完成版的 dev brach
* dev: 開發，vue-cli
* gh-pages: 放置 build 完成的檔案，並使用 GitHub Pages 服務呈現頁面

### 使用方法

1. Fork repository
2. repository 設定使用 `gh-pages` 分支呈現 GitHub Pages 頁面!["not found"](https://timtnleeproject.github.io/blog/images/default/ghpages.JPG)
3. 開始使用 gh-pages 設定 blog

## gh-pages 結構

```javascript
|_ css
|_ doc
|_ icons
|_ images
|_ js
.gitignore
favicon.ico
index.html
list.json
setting.js
```

## 文章

### 規範

* 文章存放路徑: `/doc`， 直接在此資料夾修改或新增文章
* 文章一律使用 markdown 格式
* **文章第一行必須為大標題 `# 你的標題`，以便預覽頁順利呈現**

```markdown
# Title

內文，會出現在預覽

## header
...
```

### 文章清單

文章清單為 `list.json`, 紀錄文章的資訊， 結構如下：

```javascript
{
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

新增文章至 `/doc` 資料夾後，需在文章清單 (`list.articles`)陣列中 加入文章資訊

```javascript
{
  "name":"ex2", //文章檔案名稱
  "date":"2019/1/14", //文章日期
  "tags":["Mental Health"] //文章標籤
}
```

### 引用圖片

圖片存放位置 `/images` 資料夾

上傳圖片後可在 markdown 中引用

```markdown
![""](images/your_images.jpg)
```

可在 images 底下再分資料夾區別各個文章的圖片

注意如果圖片檔名含有特殊字元，需使用 URL Encoding

例如圖片為 `my pic.jpg`，引用方式：

```markdown
![""](images/my%20pic.jpg.jpg)
```

## 客製化

### 屬性、文字設定

設定檔在 `setting.js`，可直接更改

```javascript
return {
  HEADER_TITLE: "This is Blog's name",
  HEADER_SUBTITLE: "subtitle",
  FOOTER_TEXT: "footer text",
  HOME_ARTICLE_TEXT: "Newest articles",
  HOME_MAX_PREVIEW : 10, //首頁顯示文章數量
  PREVIEW_LINE : 1, //文章預覽段落數
  CONTACT: [ //About Page's icons
    {src:'icons/fb.png',href:'/'},
    {src:'icons/ig.png',href:'/'},
    {src:'icons/github.png',href:'https://github.com/timtnleeProject'}
  ]
}
```

### 設定個人頁面連結 icon

更改 `settings.CONTANCT`

```javascript
CONTACT: [ //About Page's icons
  {src:'icons/fb.png',href:'https://yourfblinks'}, //src為圖片位置, href 為連結
  {src:'icons/ig.png',href:'https://youriglinks'},
  {src:'icons/github.png',href:'https://github.com/timtnleeProject'}
]
```

記得在 `icons` 資料夾上傳對應的圖示

### 色系

可在 `css/theme.css` 中更改 css 變數

```css
:root {
  --color-dark: #1e2022;
  --color-main: #52616a;
  --color-sub: #c9d6de;
  --color-light: #f0f5f9;
  --color-special: #0099CC;
  --font-family:  'Avenir', Arial,'微軟正黑體',Helvetica, sans-serif;
}
```

## Syntax hightlight

使用 Prism, 預設只有 js, css, html, python

如需其他語言樣式，請至 Prism 網站下載相對應的 js, css 檔案

分別放至 `js/prism.js`, `css/prism.css`