<template>
  <div id="app">
    <z-layout v-if="$route.path !== '/login'"><router-view/></z-layout>
    <div v-else><router-view/></div>
  </div>
</template>

<script>
import ZLayout from './components/layout'
export default {
  components: {
    ZLayout
  }
}
</script>

<style lang="less">
</style>
