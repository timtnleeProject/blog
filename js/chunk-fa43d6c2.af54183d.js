(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa43d6c2"],{6281:function(t,n,e){},b463:function(t,n,e){"use strict";var s=e("6281"),c=e.n(s);c.a},f820:function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("loading",{attrs:{loaded:t.loaded}}),e("div",{staticClass:"center-max-view"},[e("div",{staticClass:"article",domProps:{innerHTML:t._s(t.content)}})]),e("div",{staticClass:"contact"},t._l(t.settings.CONTACT,function(t){return e("a",{key:t.src,attrs:{href:t.href,target:"_blank"}},[e("img",{staticClass:"icon",attrs:{src:t.src}})])}),0)],1)},c=[],i=(e("ac6a"),e("cebc")),a=e("2f62"),o=e("3a5e"),r={components:{Loading:o["a"]},data:function(){return{content:"",loaded:!1}},created:function(){this.getSource()},computed:Object(i["a"])({},Object(a["b"])({lists:"lists",settings:"settings"})),methods:{getSource:function(){var t=this;this.lists.about&&this.$get("doc/".concat(this.lists.about,".md")).then(function(n){t.content=t.$markdown.render(n),t.$nextTick(function(){t.setLinksAttr(),t.loaded=!0})})},setLinksAttr:function(){this.$el.querySelectorAll("a").forEach(function(t){t.setAttribute("target","_blank")}),window.console.log("[App] set links attr.")}},watch:{lists:function(){this.getSource()}}},l=r,u=(e("b463"),e("2877")),d=Object(u["a"])(l,s,c,!1,null,"eb424c6a",null);n["default"]=d.exports}}]);
//# sourceMappingURL=chunk-fa43d6c2.af54183d.js.map