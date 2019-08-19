<template>
  <div class="tag-nav">
    <div class="tag-nav-back" @click="handleTagSlide(240)"><Icon type="ios-arrow-back" size="20"/></div>
    <div class="tag-nav-content" ref="tagContent" @DOMMouseScroll="handleTagScroll" @mousewheel="handleTagScroll">
      <div class="tag-nav-list" ref="tagList" :style="{ left: tagListLeft + 'px' }">
        <transition-group>
          <Tag
            v-for="tag in tagData"
            :color="tag.isChoosed ? 'primary' : '#e9eaec'"
            :name="tag.path"
            :key="tag.id"
            @click.native="handleClickTag(tag)"
            @on-close="handleCloseTag(tag)"
            closable
            type="dot"
            class="tag-nav-item">{{ tag.menuName }}
          </Tag>
        </transition-group>
      </div>
    </div>
    <div class="tag-nav-forward" @click="handleTagSlide(-240)"><Icon type="ios-arrow-forward" size="20"/></div>
    <div class="tag-nav-tool"><Icon type="ios-close-circle-outline" size="20"/></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      tagListLeft: 0
    }
  },
  computed: {
    ...mapState('menu', ['tagData'])
  },
  watch: {
    tagData (value) {
      this.$nextTick(() => {
        let num = this.$refs.tagList.offsetWidth - this.$refs.tagContent.offsetWidth
        if (num < 0) {
          this.tagListLeft = 0
        } else {
          this.tagListLeft = -num
        }
      })
    }
  },
  methods: {
    ...mapMutations('menu', ['closeTag']),
    handleClickTag (tag) {
      this.$router.push(tag.path)
    },
    handleCloseTag (tag) {
      if (this.tagData.length > 1) {
        this.closeTag(tag.path)
      }
      if (tag.isChoosed) {
        this.$router.push(this.tagData[this.tagData.length - 1].path)
      }
    },
    handleTagSlide (offset) {
      let tagContentOffsetWidth = this.$refs.tagContent.offsetWidth
      let tagListOffsetWidth = this.$refs.tagList.offsetWidth
      if (offset > 0) {
        this.tagListLeft = Math.min(0, this.tagListLeft + offset)
      } else {
        if (tagListOffsetWidth > tagContentOffsetWidth) {
          let num = tagListOffsetWidth - tagContentOffsetWidth
          this.tagListLeft = this.tagListLeft < -num ? this.tagListLeft : Math.max(this.tagListLeft + offset, tagContentOffsetWidth - tagListOffsetWidth)
        } else {
          this.tagListLeft = 0
        }
      }
    },
    handleTagScroll (e) {
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleTagSlide(delta)
    }
  }
}
</script>

<style lang="less">
.tag-nav {
  display: flex;
  line-height: 40px;
  &-back,
  &-forward,
  &-tool {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
    color: #ccc;
    background: #fff;
    cursor: pointer;
  }
  &-back {
    flex: 0 0 30px;
  }
  &-forward {
    flex: 0 0 30px;
  }
  &-content {
    position: relative;
    flex: 1 0 auto;
    box-shadow: inset 0 0 2px #ccc;
    overflow: hidden;
    .tag-nav-list {
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
    }
    .tag-nav-item:first-child {
      margin-left: 5px;
    }
  }
  &-tool {
    flex: 0 0 35px;
    border-left: 1px solid #eee;
  }
}
</style>
