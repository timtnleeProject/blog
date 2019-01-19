# Blog

[中文文件](https://timtnleeproject.github.io/blog/#/article/README)

Vuejs static blog

[Demo](https://timtnleeproject.github.io/blog/#/)

## Features

* Directly use github on gh-pages brach to update, add articles and update settings, no need of coding or compiling.
* Parsing markdwon files as articles.
* Syntax highlight (Prism)

## Repository

### braches

* master: merge recently finished commit on dev brach
* dev: development using vue-cli
* gh-pages: built static files, using GitHub Pages service

### Usage

1. Fork repository
2. setting GitHub Pages serve the `gh-pages` branch !["not found"](images/ghpages.jpg)
3. start setting blog on `gh-pages` branch 

## gh-pages branch

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

## articles

### restrict

* folder of articles: `/doc`， directly add and update article at this folder.
* using markdown file format
* **first line of the markdown file must be `# YOUR_TITLE` to parse the preview content**

```markdown
# Title

content...will show in preview

## header
...
```

### article lists

`list.json` is the article lists that record articles metadata, it looks like:

```javascript
{
  "articles": [  //all the articles
    {
      "name":"example",  // markdown file's name (exculde '.md' file type)
      "date": "2019/1/16", // date of the article
      "tags":["project"]   // tags of the article
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

### add articles

after you add a markdown file to `/doc` folder, don't forget to add article informations to the array list(`list.articles`)

```javascript
{
  "name":"ex2", // markdown file's name (exculde '.md' file type)
  "date":"2019/1/14", // date of the article
  "tags":["Mental Health"] // tags of the article
}
```

### images file

images are saved in `/images` folder

after you upload the image you can refer it in your markdown file

```markdown
![""](images/your_images.jpg)
```

you can also add subfolder under `images` folder to distinguish different articles' pictures

notice that if your image's name includes special characters, URL Encoding is needed.

for example if  image's name is `my pic.jpg`, to correctly refer to it:

```markdown
![""](images/my%20pic.jpg.jpg)
```

## customize

### attributes, text setting

`setting.js` is the setting file, just change it if you need to.

```javascript
return {
  HEADER_TITLE: "This is Blog's name",
  HEADER_SUBTITLE: "subtitle",
  FOOTER_TEXT: "footer text",
  HOME_ARTICLE_TEXT: "Newest articles",
  HOME_MAX_PREVIEW : 10, //home page's articles number
  PREVIEW_LINE : 1, //number of paragraph for article's preview
  CONTACT: [ //About Page's icons
    {src:'icons/fb.png',href:'/'},
    {src:'icons/ig.png',href:'/'},
    {src:'icons/github.png',href:'https://github.com/timtnleeProject'}
  ]
}
```

### set the About page icons

change the `settings.CONTANCT`

```javascript
CONTACT: [ //About Page's icons
  {src:'icons/fb.png',href:'https://yourfblinks'}, //src is the image url, href is link
  {src:'icons/ig.png',href:'https://youriglinks'},
  {src:'icons/github.png',href:'https://github.com/timtnleeProject'}
]
```

make sure you upload the right icon at `icons` folder

### color theme

change the css variables in `css/theme.css`

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

This blog is using Prism, defult languages are js, css, html and python

if you need more languages support, please go visit Prism's website and download the corresponding js, css files

put the files to `js/prism.js` and `css/prism.css`