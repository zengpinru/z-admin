export default {
  namespaced: true,
  state: {
    menuNativeData: [], // 后端获取到的原始菜单数据
    menuHashtableById: {}, // 根据id直接获取到对应的菜单信息
    menuHashtableByPath: {}, // 根据path直接获取到对应的菜单信息
    menuData: [], // 要渲染的菜单数据
    tagData: [], // 标签导航栏的数据
    breadcrumbData: [], // 面包屑数据
    hasGetInfo: false
  },
  mutations: {
    /**
     * 设置是否获取了用户信息
     * @param {Object} state
     * @param {Boolean} value
     */
    setHasGetInfo (state, value) {
      state.hasGetInfo = value
    },
    /**
     * 把后端获取到的数据保存到vuex
     * @param {Object} state
     * @param {Array} data
     */
    setMenuNativeData (state, data) {
      state.menuNativeData = data
    },
    /**
     * 设置菜单hash表,方便根据id获取菜单信息
     * @param {Object} state
     * @param {Object} data
     */
    setMenuHashtableById (state, data) {
      state.menuHashtableById = data
    },
    /**
     * 设置菜单hash表,方便根据path获取菜单信息
     * @param {Object} state
     * @param {Object} data
     */
    setMenuHashtableByPath (state, data) {
      state.menuHashtableByPath = data
    },
    /**
     * 把后端获取到的一维菜单数据转为树形结构的数组
     * @param {Object} state
     */
    setMenuData (state) {
      let objById = {}
      let objByPath = {}
      for (let menu of state.menuNativeData) {
        objById[menu.id] = menu
        objByPath[menu.path] = menu
        delete menu.childrens
      }
      this.commit('menu/setMenuHashtableById', objById)
      this.commit('menu/setMenuHashtableByPath', objByPath)
      state.menuNativeData.forEach(item => {
        let parent = objById[item.parentId]
        if (parent) {
          parent.childrens = parent.childrens ? parent.childrens : []
          parent.childrens.push(item)
        }
      })
      state.menuData = state.menuNativeData.filter(item => item.parentId === 0)
      // 排序一级菜单
      state.menuData.sort((a, b) => {
        return b.order - a.order
      })
    },
    /**
     * 更新tagData中的数据
     * @param {Object} state
     * @param {String} path 路由中的path
     */
    updateTagData (state, path) {
      let index = state.tagData.findIndex(item => item.path === path)
      if (index === -1) { // 没有在tagData中
        state.tagData.forEach(item => {
          item.isChoosed = false
        })
        let target = state.menuHashtableByPath[path]
        if (target) {
          target.isChoosed = true
          state.tagData.push(target)
        } else { // path既不在tagData中也不在menuNativeData中,显示的是404页面
          let page404 = state.menuHashtableByPath['/404']
          let page404Index = state.tagData.findIndex(item => item.path === '/404')
          if (page404Index === -1) { // tagData中没有404页
            page404.isChoosed = true
            state.tagData.push(page404)
          } else {
            page404.isChoosed = true
          }
        }
      } else { // 在tagData中, 将对应的菜单的isChoosed设置为true,其他的设置为fasle
        for (let item of state.tagData) {
          item.isChoosed = (item.path === path)
        }
      }
    },
    /**
     * 关闭tagData
     * @param {Object} state
     * @param {String} path 路由中的path
     */
    closeTag (state, path) {
      let index = state.tagData.findIndex(item => item.path === path)
      state.tagData.splice(index, 1)
    },
    /**
     * 更新面包屑数据
     * @param {Object} state
     * @param {String} path 路由path
     */
    updateBreadcrumbData (state, path) {
      let arr = []
      let parentId = 0
      let parent = null
      let currentPage = state.menuHashtableByPath[path]
      if (currentPage) {
        arr.push(currentPage)
        parentId = currentPage.parentId
      } else {
        arr.push(state.menuHashtableByPath['/404'])
      }
      while (parentId !== 0) {
        parent = state.menuHashtableById[parentId]
        arr.unshift(parent)
        parentId = parent.parentId
      }
      if (!arr.find(item => item.path === '/')) {
        arr.unshift(state.menuHashtableByPath['/'])
      }
      state.breadcrumbData = arr
    }
  },
  actions: {
    initMenuData ({ commit }, data) {
      return new Promise((resolve, reject) => {
        try {
          commit('setMenuNativeData', data)
          commit('setMenuData')
          commit('setHasGetInfo', true)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
