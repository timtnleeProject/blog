<template>
  <div class="banner">
    <img :src="settings.BANNER_IMAGE" alt="" srcset="">
    <h3 class="quote">
      <pre>{{settings.QUOTE}}</pre>
    </h3>
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
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
  top: 0;
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
  pre {
    font-family: inherit;
  }
}
@media screen and (max-width: $md){
  .banner .quote {
    font-size: 1rem;
  }
}
@media screen and (min-width: $md){
  .banner {
    height: 400px;
  }
  .banner img{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
@media screen and (max-width: $lg) and (min-width: $md){
  .banner .quote {
    font-size: 1.2rem;
  }
}
</style>
