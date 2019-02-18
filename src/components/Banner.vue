<template>
  <div class="banner">
    <h3 class="quote">{{settings.QUOTE}}</h3>
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

<style lang="scss" scoped>
@import 'Style';

.banner {
  overflow: hidden;
  height: auto;
  max-height: 400px;
  position: relative;
  background-color: $color-dark;
}
.banner img{
  width: 100%;
  display: block;
}
.banner .quote {
  color: white;
  text-shadow: 3px 3px 3px black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  width: 100%;
  font-weight: lighter;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.5rem;
}
@media screen and (max-width: $lg){
  .banner .quote {
    font-size: 1rem;
  }
}
@media screen and (max-width: $lg) and (min-width: $md){
  .banner .quote {
    font-size: 1.2rem;
  }
}
</style>


