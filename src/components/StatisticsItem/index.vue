<template>
  <div class="StatisticsItem" :style="{backgroundColor: backColor}">
    <i :class="[`${backIcon}`, 'item-icon']"></i>
    <span class="itemName">{{itemName}}</span>
    <span class="totalAmount">
      <count-to :start-val="0" :end-val="totalAmount" :duration="400"></count-to>
    </span>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'StatisticsItem',
  components: {
    CountTo
  },
  props: {
    // 统计模块名称
    itemName: {
      type: String,
      default: ''
    },
    // 总计值
    totalAmount: {
      type: Number,
      default: 0
    },
    // backIcon
    backIcon: {
      type: String,
      default: ''
    },
    // backColor
    backColor: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus" scoped>
  .StatisticsItem
    position relative
    display flex
    justify-content center  
    align-items center
    box-sizing border-box
    padding 18px 10px 20px
    width 31%
    height 116px
    color #FFFFFF
    .totalAmount
      position absolute
      bottom 20px
      right 10px
      font-size 48px
    .itemName
      position absolute
      top 18px
      left 10px
      font-size 18px
      font-weight bolder 
    .item-icon
      font-size 144px
      opacity 0.2
</style>
