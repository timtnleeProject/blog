<template>
  <div class="banner">
    <h3 class="quote tx-light">{{settings.QUOTE}}</h3>
    <img :src="settings.BANNER_IMAGE" alt="" srcset="">
  </div>
</template>

<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>

<style scoped>
.banner {
  position: relative;
}
.banner img{
  width: 100%;
  display: block;
}
.banner .quote {
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  font-weight: lighter;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.5rem;
  opacity: 0.8;
  /* padding: 20px;
  font-size: 1.5rem; */
}
@media screen and (max-width:992px){
  .banner .quote {
    font-size: 1rem;
  }
}
@media screen and (max-width:992px) and (min-width: 768px){
  .banner .quote {
    font-size: 1.2rem;
  }
}
</style>


