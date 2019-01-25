# Blog

[中文文件](https://timtnleeproject.github.io/vuejs-static-blog/#/article/README)

Vuejs static blog

[Demo](https://timtnleeproject.github.io/vuejs-static-blog/#/)

## Features

* Directly use github on gh-pages brach to update, add articles and update settings, no need of coding or compiling.
* Parsing markdwon files as articles.
* Syntax highlight (Prism)
* IE Supported

## Repository

### braches

* master: merge recently finished commit on dev brach
* dev: development using vue-cli
  * dev-server: `npm run serve`
  * build: `npm run build`
  * deploy to gh-pages: `npm run deploy`
  * build & deploy: `npm run build&deploy`
* gh-pages: built static files, using GitHub Pages service

### Usage

1. Clone repository
2. setting GitHub Pages serve the `gh-pages` branch !["not found"](https://raw.githubusercontent.com/timtnleeProject/vuejs-static-blog/master/public/images/default/ghpages.JPG)
3. start writing your blog!

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
  "pinned": true, // pinned article
  "image": "images/<YOUR_IMAGE>", //path of preview image
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
  BANNER_IMAGE: "images/default/bird on water.jpg", //path of the home page image
  DEFAULT_PREVIEW_IMAGE: "images/default/aurora.jpg", // default path of preview image
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

## Syntax hightlight

This blog is using Prism, defult languages are js, css, html and python

if you need more languages support, please go visit Prism's website and download the corresponding js, css files

put the files to `js/prism.js` and `css/prism.css`

## develope & compile

You can only use `gh-pages` to update/add articles or change some basic settings.

Or you can use the normal work flow to develope:

checkout to `dev`/`master` branch

> Notice, remember to synchronize articles that in gh-pages brach's `/doc` to dev/master brach's `/public/doc` (depand on which branch you use), make sure that articles in dev or master branch are the latest version to avoid overwrite when deploy.

webpack dev server

```bash
npm run serve
```

build to `/dist` folder

```bash
npm run build
```

deploy to `gh-pages` branch

```bash
npm run deploy
```

build + deploy

```bash
npm run auto
```

### color theme

There's some scss variables in `/src/styles/theme.scss` that you can change.

```scss
$color-dark: #1e2022;
$color-main: #52616a;
$color-sub: #c9d6de;
$color-light: #f0f5f9;
$color-special: #0099CC;
$font-family:  'Avenir', Arial,'微軟正黑體',Helvetica, sans-serif;

$pd: 40px 60px 60px 30px; /* content*/
$pd-sm: 20px 20px 30px 20px; /* mobile*/
$side-bar-width: 240px;
$tree-width: 230px;
$max-view: 700px;
```