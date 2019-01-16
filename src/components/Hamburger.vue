<template>
    <div class="hamburger">
      <div class="bar bg-light" v-for="i in 3" :key="`bar${i}`"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.hamburger {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.hamburger .bar{
  margin: 0;
  width: 100%;
  flex: 0 0 3px;
  border-radius: 20px;
}
</style>

