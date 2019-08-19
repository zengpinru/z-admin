<template>
  <div class="header">
    <div class="menu-icon">
      <Icon type="md-menu" size="28" @click.native="toggleCollapse" :class="rotateIcon"/>
    </div>
    <div class="header-con">
      <div class="header-con-l">
        <Breadcrumb>
          <BreadcrumbItem :to="bread.type === 1 ? bread.path : ''" v-for="bread in breadcrumbData" :key="bread.id">
            {{ bread.menuName }}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="header-con-r">
        <Dropdown>
          <span>
            <img src="../../assets/img/header.png" alt="img">
            <Icon type="md-arrow-dropdown" size="18" />
          </span>
          <DropdownMenu slot="list">
            <DropdownItem>个人信息</DropdownItem>
            <DropdownItem>修改密码</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rotateIcon () {
      return [this.isCollapsed ? 'rotate-icon' : '']
    },
    breadcrumbData () {
      return this.$store.state.menu.breadcrumbData
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggle-collapse')
    }
  }
}
</script>

<style lang="less">
.header {
  position: relative;
  .menu-icon {
    position: absolute;
    left: -20px;
    cursor: pointer;
    i {
      transition: all .5s;
    }
    .rotate-icon {
      transform: rotate(-90deg);
    }
  }
  &-con {
    display: flex;
    justify-content: space-between;
    &-l {
      margin-left: 25px;
    }
    &-r {
      img {
        height: 40px;
        vertical-align: middle;
      }
    }
  }
}
</style>
