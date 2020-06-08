<template>
  <div class="layout">
    <Layout>
      <div class="sider" :class="siderClasses">
        <Sider ref="sider"
          :collapsed-width="collapsedWidth"
          :width="siderWidth"
          class="sider-item"
          hide-trigger
          collapsible
          v-model="isCollapsed"
        >
          <z-logo :isCollapsed="isCollapsed"/>
          <z-menu :siderWidth="siderWidth" :isCollapsed="isCollapsed"/>
        </Sider>
      </div>
      <Layout>
        <Header><z-header @toggle-collapse="toggleCollapse" :isCollapsed="isCollapsed"/></Header>
        <z-tag-nav></z-tag-nav>
        <Content class="content" :style="{ width: contentWidth }"><slot></slot></Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import ZLogo from './ZLogo'
import ZMenu from './ZMenu'
import ZHeader from './ZHeader'
import ZTagNav from './ZTagNav'

export default {
  data () {
    return {
      isCollapsed: false,
      siderWidth: 217, // 侧边栏的宽度,比他的包含块大17px,主要是为了侧边栏内容过多时隐藏滚动条
      collapsedWidth: 65 // 侧边栏收缩后的宽度
    }
  },
  computed: {
    siderClasses () {
      return [this.isCollapsed ? 'sider-collapsed' : 'sider-not-collapsed']
    },
    contentWidth () {
      return this.isCollapsed ? 'calc(100vw - 65px)' : 'calc(100vw - 200px)'
    }
  },
  methods: {
    toggleCollapse () {
      this.$refs.sider.toggleCollapse()
    }
  },
  components: {
    ZLogo,
    ZMenu,
    ZHeader,
    ZTagNav
  }
}
</script>

<style lang="less">
.sider {
  height: 100vh;
  overflow: hidden;
  background-color: rgb(0, 21, 41);
  transition: width ease .5s;
  &-item {
    max-height: 100vh;
  }
}
.sider-collapsed {
  width: 65px;
  .sider-item {
    overflow: hidden;
  }
}
.sider-not-collapsed {
  width: 200px;
  .sider-item {
    overflow-y: auto;
  }
}
.content {
  height: ~"calc(100vh - 106px)";
  padding: 15px;
  overflow-y: auto;
}
</style>
