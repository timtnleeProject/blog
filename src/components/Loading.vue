<template>
    <div class="loading tx-main" v-if="!loaded">
        <div>loading</div>
        <div v-for="i in 3" :key="i" class="dot bg-main" :class="`dot${i}`"></div>
    </div>
</template>

<script>
export default {
  props: {
    loaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
    * {
        margin-right: 5px;
    }
    display: flex;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(255,255,255,0.5);
    justify-content: center;
    align-items: center;
    .dot {
        height: 0.86em;
        width: 0.86em;
        transform: scale(0);
        border-radius: 50%;
    }
    .dot1{
        animation: zoom 1.2s infinite;
    }
    .dot2{
        animation: zoom 1.2s .2s infinite;
    }
    .dot3{
        animation: zoom 1.2s .2s infinite;
    }
}

@keyframes zoom {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(0);
    }
}
</style>

