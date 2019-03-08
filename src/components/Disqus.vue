<template>
    <div id="disqus_thread"></div>
</template>

<script>
export default {
  data: ()=>{
    return {
      scriptID: 'disqus_script'
    }
  },
  mounted(){
    const vm = this

    window.disqus_config = function () {
      this.page.url = window.location.href  // Replace PAGE_URL with your page's canonical URL variable  
      this.page.identifier = vm.$route.path // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    }

    const d = document,
      s = d.createElement('script'),
      el = d.getElementById(this.scriptID)

    if(el) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = window.location.href
        }
      })
      return
    }
    s.id = this.scriptID
    s.src = 'https://https-timtnleeproject-github-io-blog-2.disqus.com/embed.js?'
    s.setAttribute('data-timestamp', +new Date());

    (d.head||d.body).appendChild(s)
  }
}
</script>
