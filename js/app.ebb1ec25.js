(function(t){function e(e){for(var s,a,o=e[0],c=e[1],u=e[2],l=0,d=[];l<o.length;l++)a=o[l],i[a]&&d.push(i[a][0]),i[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);f&&f(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],s=!0,a=1;a<n.length;a++){var o=n[a];0!==i[o]&&(s=!1)}s&&(r.splice(e--,1),t=c(c.s=n[0]))}return t}var s={},a={app:0},i={app:0},r=[];function o(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-32dc6350":"09d42eb5","chunk-d803318a":"d56e09cb","chunk-fa43d6c2":"af54183d"}[t]+".js"}function c(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-32dc6350":1,"chunk-d803318a":1,"chunk-fa43d6c2":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var s="css/"+({}[t]||t)+"."+{"chunk-32dc6350":"bbd4ce09","chunk-d803318a":"4f18991d","chunk-fa43d6c2":"15316e45"}[t]+".css",i=c.p+s,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var u=r[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===s||l===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){u=d[o],l=u.getAttribute("data-href");if(l===s||l===i)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var s=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");r.request=s,delete a[t],f.parentNode.removeChild(f),n(r)},f.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){a[t]=0}));var s=i[t];if(0!==s)if(s)e.push(s[2]);else{var r=new Promise(function(e,n){s=i[t]=[e,n]});e.push(s[2]=r);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(t),u=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=i[t];if(0!==n){if(n){var s=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+s+": "+a+")");r.type=s,r.request=a,n[1](r)}i[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=s,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)c.d(n,s,function(e){return t[e]}.bind(null,s));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var f=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"376d":function(t,e,n){"use strict";var s=n("3cc7"),a=n.n(s);a.a},"3a5e":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.loaded?t._e():n("div",{staticClass:"loading tx-main"},[n("div",[t._v("loading")]),t._l(3,function(t){return n("div",{key:t,staticClass:"dot bg-main",class:"dot"+t})})],2)},a=[],i={props:{loaded:{type:Boolean,default:!1}}},r=i,o=(n("a864"),n("2877")),c=Object(o["a"])(r,s,a,!1,null,"78668eca",null);e["a"]=c.exports},"3cc7":function(t,e,n){},4897:function(t,e,n){"use strict";var s=n("ae75"),a=n.n(s);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("my-header",{staticClass:"my-header bg-main tx-light",on:{toggleBar:t.toggleSideBar}}),n("div",{staticClass:"container",style:t.stickyPolyfill()},[n("loading",{attrs:{loaded:t.loaded}}),n("router-view",{staticClass:"content"}),n("my-footer")],1),n("div",{staticClass:"fixed-container bg-dark",class:{show:t.show},on:{click:t.closeSideBar}},[n("my-sidebar",{staticClass:"sidebar bg-dark"}),n("a",{staticClass:"bottom bandage",attrs:{href:"https://github.com/timtnleeProject/vuejs-static-blog",target:"_blank"}},[t._v("vuejs-static-blog")])],1)],1)},i=[],r=n("cebc"),o=(n("55dd"),n("28a5"),n("7f7f"),n("795b")),c=n.n(o),u=(n("ac6a"),n("5df3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("h2",{staticClass:"title",on:{click:t.toHome}},[t._v(t._s(t.settings.HEADER_TITLE))]),n("div",{staticClass:"subtitle"},[t._v(t._s(t.settings.HEADER_SUBTITLE))]),n("hamburger",{staticClass:"hamburger",nativeOn:{click:function(e){t.toggleBar(e)}}})],1)}),l=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hamburger"},t._l(3,function(t){return n("div",{key:"bar"+t,staticClass:"bar bg-light"})}),0)},f=[],p={},h=p,v=(n("376d"),n("2877")),g=Object(v["a"])(h,d,f,!1,null,"e8a1d0ea",null),m=g.exports,_={components:{Hamburger:m},data:function(){return{}},computed:{settings:function(){return this.$store.state.settings}},methods:{toHome:function(){this.$router.push("/")},toggleBar:function(t){t.stopPropagation(),this.$emit("toggleBar")}}},b=_,w=(n("cfaa"),Object(v["a"])(b,u,l,!1,null,"134e5ad0",null)),y=w.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("div",{staticClass:"title"},[t._v(t._s(t.settings.HEADER_TITLE))]),n("small",{staticClass:"indent"},[t._v(t._s(t.settings.SIDEBAR_TEXT))]),t._l(t.routes,function(e){return n("router-link",{key:e.name,staticClass:"tx-light",class:{active:e.path===t.$route.path},attrs:{to:e.path}},[n("span",{staticClass:"tx"},[t._v(t._s(e.name))])])})],2)},C=[],k=n("2f62"),T=s["a"].extend({data:function(){return{routes:[{name:"Home",path:"/"},{name:"Articles",path:"/search"},{name:"About me",path:"/about"}]}},computed:Object(r["a"])({},Object(k["b"])({settings:"settings"}))}),x=T,O=(n("b7e5"),Object(v["a"])(x,E,C,!1,null,"3b914d7e",null)),j=O.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"footer bg-sub tx-dark"},[n("div",{staticClass:"title"},[t._v(t._s(t.settings.FOOTER_TEXT))])])},S=[],A={data:function(){return{}},computed:{settings:function(){return this.$store.state.settings}}},P=A,M=(n("4897"),Object(v["a"])(P,$,S,!1,null,"44a5ad0a",null)),B=M.exports,L=n("3a5e"),H={name:"app",data:function(){return{show:!1,loaded:!1}},components:{MyHeader:y,MyFooter:B,MySidebar:j,Loading:L["a"]},created:function(){var t=this;window.console.log("[Init] Get articles' previews");var e=this.$get("./setting.js").then(function(e){t.$store.commit("setSettings",new Function(e)())}),n=this.$get("./list.json").then(function(e){t.$store.commit("setLists",JSON.parse(e))});c.a.all([e,n]).then(function(){var e={},n={},s=[],a=t.lists.articles.map(function(t){return e[t.name]=t,t.name});t.$getArticles(a).then(function(a){t.$store.commit("setPreviews",a.map(function(a){var i=a.content.split("\n").filter(function(t){return""!=t.trim()}),r=i.slice(1,1+t.settings.PREVIEW_LINE).join("\n"),o=e[a.name],c=o.tags||[];return c.forEach(function(t){n[t]?n[t]+=1:(n[t]=1,s.push(t))}),{name:a.name,pinned:o.pinned,image:o.image,tags:c.sort(),content:t.$markdown.render(r)+"</br>",date:new Date(o.date),title:i[0].slice(-(i[0].length-2))}})),t.$store.commit("setTags",s),t.$store.commit("setTagsCount",n),t.loaded=!0}).catch(function(t){window.console.error(t)})})},computed:Object(r["a"])({},Object(k["b"])({settings:"settings",lists:"lists"})),methods:{stickyPolyfill:function(){return window.CSS&&CSS.supports("position","sticky")?{}:{marginTop:"60px"}},toggleSideBar:function(){this.show=!this.show},closeSideBar:function(){this.show&&(this.show=!1)}}},I=H,R=(n("5c0b"),Object(v["a"])(I,a,i,!1,null,null,null)),N=R.exports,D=n("5d73"),X=n.n(D),q=n("d4cd"),F=n.n(q),G={install:function(t){t.prototype.$markdown=new F.a,t.prototype.$get=function(t){return new c.a(function(e,n){var s=new XMLHttpRequest;s.open("GET",t),s.onreadystatechange=function(){200===this.status&&4===this.readyState?e(this.responseText):4===this.readyState&&n("Fetching ".concat(t," failed"))},s.send()})},t.prototype.$getArticles=function(t){var e=function(t){return new c.a(function(e,n){var s=new XMLHttpRequest;s.open("GET","./doc/".concat(t,".md")),s.onreadystatechange=function(){200===this.status&&4===this.readyState?e({name:t,content:this.responseText}):4===this.readyState&&n()},s.send()})},n=[],s=!0,a=!1,i=void 0;try{for(var r,o=X()(t);!(s=(r=o.next()).done);s=!0){var u=r.value;n.push(e(u))}}catch(l){a=!0,i=l}finally{try{s||null==o.return||o.return()}finally{if(a)throw i}}return c.a.all(n)}}},V=n("ce19"),W=n("8c4f"),Y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("banner"),n("div",{staticClass:"center-max-view"},[n("div",[t.pinned_previews.length>0?n("div",[n("h2",{staticClass:"h tx-dark"},[t._v(t._s(t.settings.HOME_PINNED_ARTICLE_TEXT))]),n("my-previews",{attrs:{max:t.settings.HOME_MAX_PREVIEW,previews:t.pinned_previews}})],1):t._e(),t.normal_previews.length>0?n("div",[n("h2",{staticClass:"h tx-dark"},[t._v(t._s(t.settings.HOME_ARTICLE_TEXT))]),n("my-previews",{attrs:{max:t.settings.HOME_MAX_PREVIEW,previews:t.normal_previews}})],1):t._e(),n("router-link",{staticClass:"block last",attrs:{to:"/search"}},[t._v("> more articles")])],1)])],1)},J=[],U=n("ed81"),Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner"},[n("img",{attrs:{src:t.settings.BANNER_IMAGE,alt:"",srcset:""}}),n("h3",{staticClass:"quote"},[n("pre",[t._v(t._s(t.settings.QUOTE))])])])},z=[],K={computed:{settings:function(){return this.$store.state.settings}}},Z=K,tt=(n("e614"),Object(v["a"])(Z,Q,z,!1,null,"064f750d",null)),et=tt.exports,nt={components:{Banner:et,MyPreviews:U["a"]},computed:Object(r["a"])({pinned_previews:function(){return this.sorted_previews.filter(function(t){return t.pinned})},normal_previews:function(){return this.sorted_previews.filter(function(t){return!t.pinned})},sorted_previews:function(){return this.previews.slice().sort(function(t,e){return e.date.getTime()-t.date.getTime()})}},Object(k["b"])({previews:"previews",settings:"settings"}))},st=nt,at=(n("b75d"),Object(v["a"])(st,Y,J,!1,null,"a330ecf2",null)),it=at.exports;s["a"].use(W["a"]);var rt=function(){return n.e("chunk-32dc6350").then(n.bind(null,"3ad6"))},ot=function(){return n.e("chunk-d803318a").then(n.bind(null,"2d3b"))},ct=function(){return n.e("chunk-fa43d6c2").then(n.bind(null,"f820"))},ut=[{path:"/",component:it,meta:{title:"Home"}},{path:"/article/:name",component:rt,meta:{title:"Article"}},{path:"/search",component:ot,meta:{title:"Articles"}},{path:"/about",component:ct,meta:{title:"About"}}],lt=new W["a"]({routes:ut,scrollBehavior:function(){return{x:0,y:0}}});lt.beforeEach(function(t,e,n){document.title="Timtnlee's Blog - ".concat(t.meta.title),n()});var dt=lt;s["a"].use(k["a"]);var ft=new k["a"].Store({state:{previews:[],tags:[],lists:{},settings:{},tags_count:{}},mutations:{setPreviews:function(t,e){t.previews=e},setTags:function(t,e){t.tags=e},setLists:function(t,e){t.lists=e},setSettings:function(t,e){t.settings=e},setTagsCount:function(t,e){t.tags_count=e}}}),pt=ft;n("99f6");window.NodeList.prototype.forEach||(window.NodeList.prototype.forEach=function(t){for(var e=0;e<this.length;e++)t(this[e])}),void 0===window.scrollY&&window.addEventListener("scroll",function(){window.scrollY=window.pageYOffset}),s["a"].config.productionTip=!1,s["a"].use(G),s["a"].use(V["a"]),new s["a"]({render:function(t){return t(N)},router:dt,store:pt}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var s=n("5e27"),a=n.n(s);a.a},"5e27":function(t,e,n){},"7cfe":function(t,e,n){},8747:function(t,e,n){},"99f6":function(t,e,n){},a864:function(t,e,n){"use strict";var s=n("8747"),a=n.n(s);a.a},adc9:function(t,e,n){"use strict";var s=n("aeab"),a=n.n(s);a.a},ae75:function(t,e,n){},aeab:function(t,e,n){},b75d:function(t,e,n){"use strict";var s=n("f021"),a=n.n(s);a.a},b7e5:function(t,e,n){"use strict";var s=n("f69f"),a=n.n(s);a.a},c009:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tag",on:{click:function(e){e.stopPropagation(),t.linkto()}}},[n("div",{staticClass:"dot"}),n("div",{staticClass:"tag-name"},[t._v(t._s(t.tag)+" ("+t._s(t.$store.state.tags_count[t.tag])+")")])])},a=[],i={props:["tag"],methods:{linkto:function(){var t={};t[this.tag]=!0,this.$router.push({path:"/search",query:t})}}},r=i,o=n("2877"),c=Object(o["a"])(r,s,a,!1,null,null,null);e["a"]=c.exports},cfaa:function(t,e,n){"use strict";var s=n("ea2d"),a=n.n(s);a.a},e614:function(t,e,n){"use strict";var s=n("7cfe"),a=n.n(s);a.a},ea2d:function(t,e,n){},ed81:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},t._l(t.previews_cut,function(e,s){return n("div",{key:"preview"+s,staticClass:"preview",on:{click:function(n){t.linkto({path:"/article/"+e.name})}}},[n("div",{staticClass:"prev-img"},[n("img",{attrs:{src:e.image||t.settings.DEFAULT_PREVIEW_IMAGE,alt:"not found"}})]),n("div",{staticClass:"prev-art"},[n("h3",{staticClass:"title b"},[t._v(t._s(e.title)),e.pinned?n("img",{staticClass:"pinned",attrs:{src:"icons/pinned.png"}}):t._e()]),n("div",{staticClass:"prev-area block"},[n("div",{staticClass:"plan-text line",domProps:{innerHTML:t._s(e.content)}}),t._m(0,!0)]),n("div",{staticClass:"line"},[n("div",{staticClass:"line b"},[t._v("date: "+t._s(t.preview_dates[s]))])]),n("div",{staticClass:"tags-container line"},[n("div",{staticClass:"line b"},[t._v("tags: ")]),t._l(e.tags,function(t){return n("tag",{key:t,staticClass:"line",attrs:{tag:t}})})],2)])])}),0)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"inner-block line"},[n("div",{staticClass:"cover"})])}],i=n("cebc"),r=n("2f62"),o=n("c009"),c={props:["max","previews"],components:{Tag:o["a"]},computed:Object(i["a"])({preview_dates:function(){return this.previews?this.previews.map(function(t){var e=t.date;return"".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())}):[]},previews_cut:function(){return this.previews.slice(0,this.max)}},Object(r["b"])({lists:"lists",settings:"settings"})),methods:{linkto:function(t){this.$router.push(t)}}},u=c,l=(n("adc9"),n("2877")),d=Object(l["a"])(u,s,a,!1,null,"8a5c821e",null);e["a"]=d.exports},f021:function(t,e,n){},f69f:function(t,e,n){}});
//# sourceMappingURL=app.ebb1ec25.js.map