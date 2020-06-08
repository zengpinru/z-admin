<template>
  <div id="app">
    <z-layout v-if="$route.path !== '/login'"><keep-alive><router-view/></keep-alive></z-layout>
    <div v-else><router-view/></div>
  </div>
</template>

<script>
export default {
  components: {
    ZLayout: () => import('./components/layout')
  }
}
</script>

<style lang="less">
</style>
