<template>
  <div>
    <link rel="stylesheet" type="text/css" href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0" />
    <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">HTML Comment Box</a> is loading comments...</div>
  </div>
</template>

<script>
export default {
  props: ['identifier'],
  data: ()=>{
    return {
      load: true
    }
  },
  mounted(){
    if(!this.load) return
    window.hcb_user={
      PAGE: window.location.origin + `/article/${this.identifier}`
    };
    (function(){var s=document.createElement("script"), l=window.hcb_user.PAGE || (""+window.location).replace(/'/g,"%27"), h="https://www.htmlcommentbox.com";s.setAttribute("type","text/javascript");s.setAttribute("src", h+"/jread?page="+encodeURIComponent(l).replace("+","%2B")+"&mod=%241%24wq1rdBcg%24TDiewwXIHNEwN523YJ7nL."+"&opts=16862&num=10&ts=1552290750324");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s)})()
  }
}
</script>
