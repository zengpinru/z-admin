<template>
  <div class="menu">
    <Menu
      :open-names="openNames"
      :active-name="activeName"
      :width="width"
      @on-select="handleSelectMenu"
      ref="menu"
      theme="dark"
      accordion
      v-show="!isCollapsed">
      <template v-for="menu in menuData">
        <Submenu :name="menu.path" v-if="menu.childrens && menu.isShowInMenu" :key="menu.id">
          <template slot="title">
            <Icon :type="menu.menuIcon"/>{{ menu.menuName }}
          </template>
          <MenuItem :name="child.path" v-for="child in menu.childrens" :key="child.id" v-show="child.isShowInMenu">
            <Icon :type="child.menuIcon"/>{{ child.menuName }}
          </MenuItem>
        </Submenu>
        <MenuItem :name="menu.path" v-if="!menu.childrens && menu.isShowInMenu" :key="menu.id">
          <Icon :type="menu.menuIcon"/>{{ menu.menuName }}
        </MenuItem>
      </template>
    </Menu>
    <div class="dropdown-menu" v-show="isCollapsed">
      <template v-for="menu in menuData">
        <Dropdown transfer placement="right-start" v-if="menu.childrens" :key="menu.id" class="dropdown-menu-item" @on-click="handleClickDropdown">
          <div class="dropdown-menu-icon">
            <Icon :type="menu.menuIcon" :size="menu.menuIconSize" color="#fff"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem v-for="child in menu.childrens" :key="child.id" :name="child.path">
              {{ child.menuName }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer placement="right-start" v-if="!menu.childrens" :key="menu.id" class="dropdown-menu-item" @on-click="handleClickDropdown">
          <div class="dropdown-menu-icon">
            <Icon :type="menu.menuIcon" :size="menu.menuIconSize" color="#fff"/>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem :name="menu.path">{{ menu.menuName }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      activeName: '',
      openNames: []
    }
  },
  props: {
    siderWidth: {
      type: Number,
      default: 217
    },
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('menu', ['menuData', 'menuHashtableByPath']),
    width () {
      return this.siderWidth.toString()
    }
  },
  methods: {
    ...mapMutations('menu', ['updateTagData', 'updateBreadcrumbData']),
    handleSelectMenu (path) {
      if (this.menuHashtableByPath[path].type === 1) { // 如果不是链接类型,不跳转
        this.$router.push({ path })
      }
    },
    handleClickDropdown (path) {
      if (this.menuHashtableByPath[path].type === 1) { // 如果不是链接类型,不跳转
        this.$router.push({ path })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.activeName = to.path
      this.openNames = ['/' + to.path.slice(1).split('/')[0]]
      // 更新tagData
      this.updateTagData(to.path)
      // 更新面包屑数据
      this.updateBreadcrumbData(to.path)
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    if (this.$route.path === '/') {
      this.activeName = '/'
      this.updateTagData('/')
      this.updateBreadcrumbData('/')
    }
  }
}
</script>

<style lang="less">
.dropdown-menu {
  color: #fff;
  &-icon {
    display: flex;
    justify-content: center;
    width: 65px;
    margin: 15px 0;
    cursor: pointer;
  }
  &-item {
    display: block !important;
  }
}
</style>
