(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e7a7b06c"],{"0a49":function(t,e,n){var i=n("9b43"),r=n("626a"),s=n("4bf8"),o=n("9def"),c=n("cd1c");t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,u=4==t,f=6==t,h=5==t||f,d=e||c;return function(e,c,v){for(var g,p,w=s(e),m=r(w),x=i(c,v,3),k=o(m.length),y=0,_=n?d(e,k):a?d(e,0):void 0;k>y;y++)if((h||y in m)&&(g=m[y],p=x(g,y,w),t))if(n)_[y]=p;else if(p)switch(t){case 3:return!0;case 5:return g;case 6:return y;case 2:_.push(g)}else if(u)return!1;return f?-1:l||u?u:_}}},1169:function(t,e,n){var i=n("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"386b":function(t,e,n){var i=n("5ca1"),r=n("79e5"),s=n("be13"),o=/"/g,c=function(t,e,n,i){var r=String(s(t)),c="<"+e;return""!==n&&(c+=" "+n+'="'+String(i).replace(o,"&quot;")+'"'),c+">"+r+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(c),i(i.P+i.F*r(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}},"3ad6":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{on:{click:function(e){t.toggleMenu(e)}}},[n("loading",{attrs:{loaded:t.loaded}}),n("div",{staticClass:"tree",class:{show:t.show}},t._l(t.tree,function(e,i){return n("ul",{key:"h1"+e.name,staticClass:"h1-list"},[n("li",{class:{on:i===t.h1idx},on:{click:function(n){t.scrollTo(e.link)}}},[t._v(t._s(e.name))]),t._l(e.leaves,function(e,i){return n("ul",{key:"h2"+e.name,staticClass:"h2-list"},[n("li",{class:{on:i===t.h2idx},on:{click:function(n){t.scrollTo(e.link)}}},[t._v(t._s(e.name))]),t._l(e.leaves,function(e,r){return n("ul",{key:"h3"+e.name,staticClass:"h3-list",class:{expand:t.expand_all||i===t.h2idx}},[n("li",{class:{on:r===t.h3idx},on:{click:function(n){t.scrollTo(e.link)}}},[t._v(t._s(e.name))])])})],2)})],2)}),0),n("div",{staticClass:"menu-bar",on:{click:function(e){return e.stopPropagation(),function(){return t.show=!t.show}()}}},[n("span",[t._v("menu")])]),n("div",{staticClass:"center-max-view"},[n("div",{staticClass:"article-wrap"},[n("div",{staticClass:"tags-container"},[n("div",[t._v("tags: ")]),t._l(t.tags,function(t){return n("tag",{key:t,attrs:{tag:t}})})],2),n("div",{staticClass:"article",domProps:{innerHTML:t._s(t.content)}})])])],1)},r=[],s=(n("ac6a"),n("b54a"),n("7514"),n("cebc")),o=(n("7f7f"),n("cadf"),n("551c"),n("097d"),n("c009")),c=n("3a5e"),a=n("2f62"),l={components:{Tag:o["a"],Loading:c["a"]},data:function(){return{name:"",content:"",tree:[],loaded:!1,scrollY:0,expand_all:!1,h1idx:-1,h2idx:-1,h3idx:-1,show:!1}},created:function(){window.addEventListener("scroll",this.scroll)},destroyed:function(){window.removeEventListener("scroll",this.scroll)},mounted:function(){var t=this;this.name=this.$route.params.name,window.console.log('[Fetch] fetch article "'.concat(this.name,'"')),this.$get("./doc/".concat(this.name,".md")).then(function(e){t.content=t.$markdown.render(e),t.$nextTick(function(){window.Prism.highlightAll(),window.console.log("[Prism] syntax hightlight after fetching."),t.setLinksAttr(),t.generateMenu(),t.scroll(),t.loaded=!0})})},computed:Object(s["a"])({tags:function(){var t=this,e=this.previews.find(function(e){return e.name===t.name});return e?e.tags:[]}},Object(a["b"])({previews:"previews"})),methods:{scroll:function(){this.scrollY=window.scrollY,this.calcScrollPos()},calcScrollPos:function(){if(0!==this.tree.length){var t,e,n,i=this.getScrollOffset(),r=-1,s=-1,o=-1,c=function(t){return t.link.offsetTop-i};if(t=this.tree.map(c),r=this.getScrollIdx(t),-1!=r&&this.tree[r].leaves.length>0&&(e=this.tree[r].leaves.map(c),s=this.getScrollIdx(e)),-1!=s){var a=this.tree[r].leaves[s];n=a.leaves.map(c),o=this.getScrollIdx(n)}this.h1idx=r,this.h2idx=s,this.h3idx=o}},getScrollIdx:function(t){var e=this,n=t.reduce(function(t,n){return t+(e.scrollY+1>=n)},0);return Math.max(n-1,0)},getScrollOffset:function(){return document.querySelector(".my-header").getBoundingClientRect().height},setLinksAttr:function(){this.$el.querySelectorAll("a").forEach(function(t){t.setAttribute("target","_blank")}),window.console.log("[App] set links attr.")},generateMenu:function(){var t=[],e=1,n=t;this.$el.querySelectorAll("h1,h2,h3").forEach(function(i){var r=i.innerText,s=i.nodeName,o=i;if("H1"===s)1!=e&&(n=t,e=1),n.push({name:r,leaves:[],link:o});else if("H2"===s&&e>0)2!=e&&(n=t[t.length-1],e=2),n.leaves.push({name:r,leaves:[],link:o});else if("H3"===s&&e>1){if(3!=e){var c=t[t.length-1].leaves;n=t[t.length-1].leaves[c.length-1],e=3}n.leaves.push({name:r,link:o})}}),this.tree=t,window.console.log("[App] generate menu.")},scrollTo:function(t){var e=this.getScrollOffset();window.scrollTo(0,t.offsetTop-e),this.scroll()},toggleMenu:function(t){this.$el.querySelector(".tree").contains(t.target)||this.show&&(this.show=!1)}}},u=l,f=(n("4342"),n("2877")),h=Object(f["a"])(u,i,r,!1,null,"607f7d75",null);h.options.__file="Article.vue";e["default"]=h.exports},4342:function(t,e,n){"use strict";var i=n("47d9"),r=n.n(i);r.a},"47d9":function(t,e,n){},7514:function(t,e,n){"use strict";var i=n("5ca1"),r=n("0a49")(5),s="find",o=!0;s in[]&&Array(1)[s](function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(s)},b54a:function(t,e,n){"use strict";n("386b")("link",function(t){return function(e){return t(this,"a","href",e)}})},cd1c:function(t,e,n){var i=n("e853");t.exports=function(t,e){return new(i(t))(e)}},e853:function(t,e,n){var i=n("d3f4"),r=n("1169"),s=n("2b4c")("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-e7a7b06c.90549d88.js.map