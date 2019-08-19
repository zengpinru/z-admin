<template>
  <div class="logo">
    <img src="../../assets/img/logo.png" alt="logo">
    <span v-show="!isCollapsed">数据采集系统</span>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.logo {
  img {
    width: 40px;
    margin-left: 15px;
    vertical-align: top;
  }
  span {
    line-height: 40px;
    color: #fff;
  }
}
</style>
