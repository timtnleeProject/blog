<template>
  <div class="tag" @click.stop="linkto({path:'/search',query:{tag}})">
     <div class="dot"></div>
     <div class="tag-name">{{tag}}</div>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  methods: {
    linkto(route){
      this.$router.push(route)
    }
  }
}
</script>

