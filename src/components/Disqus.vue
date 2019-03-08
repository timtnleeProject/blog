<template>
    <div id="disqus_thread"></div>
</template>

<script>
export default {
  props: ['identifier'],
  data: ()=>{
    return {
      scriptID: 'disqus_script',
      load: false
    }
  },
  mounted(){
    if(!this.load) return
    const identifier = this.identifier

    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = identifier // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      this.page.title = identifier
    }

    const exist = document.getElementById(this.scriptID)
    if(exist) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = window.location.href
          this.page.identifier = identifier
          this.page.title = identifier
        }
      })
      return
    }

    const d = document, s = d.createElement('script')
    s.src = 'https://https-timtnleeproject-github-io-blog-2.disqus.com/embed.js'
    s.id = this.scriptID
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s)
  }
}
</script>
