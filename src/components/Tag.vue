<template>
  <div class="tag" @click.stop="linkto()">
     <div class="dot"></div>
     <div class="tag-name">{{tag}}</div>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  methods: {
    linkto(){
      const query = {}
      query[this.tag] = true
      this.$router.push({path:'/search',query})
    }
  }
}
</script>

