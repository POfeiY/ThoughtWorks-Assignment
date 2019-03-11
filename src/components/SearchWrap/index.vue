<template>
  <div class="SearchWrap">
    <el-input 
      v-model="filterText" 
      @blur="_filterTextChange" 
      placeholder="agent's name filter..."></el-input>
    <i class="icon icon-search"></i>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'SearchWrap',
  data() {
    return {
      filterText: ''
    }
  },
  methods: {
    _filterTextChange() {
      this.$emit('filter-change', this.filterText)
    }
  }
}
</script>
<style lang="stylus">
  // 修改input样式
  .SearchWrap
    .el-input__inner
      box-sizing content-box
      padding-left 35px
      width 120px
      height 30px
      border-radius 0
      border-top 1px solid rgb(225,228,230)
      border-left 1px solid rgb(225,228,230)
      border-right 0
      border-bottom 0
      background-color rgb(243,243,243)
</style>

<style lang="stylus" scoped>
  .SearchWrap
    position relative
    box-sizing border-box
    width 170px
    height 30px
    background-color rgb(243,243,243)
    .icon 
      position absolute
      top 6px
      left 12px
      font-size 18px
      color rgb(153, 153, 153)
      cursor pointer
</style>
