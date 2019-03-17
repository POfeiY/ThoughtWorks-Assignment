<template>
  <div class="WaterfallAgent">
    <div class="wrap name-wrap">
      <i class="icon icon-desktop"></i>
      <span class="name">{{agent.name}}</span>
    </div>
    <div class="detail-wrap">
      <img class="agent-icon" :src="`static/icons/${agent.os}.png`" alt="">
      <div class="detail-text">
        <p :class="`status ${agent.status}`">{{agent.status}}</p>
        <p class="wrap ip-wrap">
          <i class="icon icon-info"></i>
          <span class="text">{{agent.ip}}</span>
        </p>
        <p class="wrap folder-wrap">
          <i class="icon icon-folder"></i>
          <span class="text">{{agent.location}}</span>
        </p>
      </div>
    </div>
    <div class="detail-resource">
      <div class="resource-item" v-for="item in resourcesRender" :key="item + Math.random()">
        <span class="itemName">{{item}}</span>
        <i class="icon icon-trash" @click="_deleteResourceTag(item)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaterfallAgent',
  props: {
    // agent对象
    agent: {
      type: Object,
      required: true,
      default: ()=> {}
    }
  },
  computed: {
    resourcesRender() {
      return this.agent.resources
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    // 删除资源的指定标签
    _deleteResourceTag(tag) {
      const newResourceArr = this.agent.resources.filter(i => i !== tag)
      const postResource = {...this.agent, ...{resources: newResourceArr} }
      this.$emit('delete-resource', postResource)
    },
  }
  
}
</script>

<style lang="stylus" scoped>
  @import '~common/common.styl'
  .WaterfallAgent
    box-sizing border-box
    margin-bottom 5px
    padding 15px 15px 15px
    float left
    width 285px
    height 220px
    background-color #FFF
    .detail-resource
      display flex 
      flex-wrap wrap
      .resource-item
        flexTextWrap()
        justify-content center
        box-sizing border-box
        margin-right 10px
        margin-bottom 8px
        padding 0 8px
        min-width 66px
        height 26px
        background-color rgb(239,239,239)
        .itemName
          max-width 58px
          textWidthOverHidden()   
        &>.icon 
          margin-left 8px
          color rgb(45,64,80)
          font-weight bolder
          cursor pointer
    .detail-wrap
      display flex
      justify-content space-between
      .detail-text
        flex-grow 1
        height 80px
        .wrap
          margin-bottom 6px
          flexTextWrap()
        .text 
          font-size 14px
          color $default-color
        .status
          margin-right 35px
          margin-bottom 8px
          padding 2px 10px
          color #FFF
        .idle
          background-color rgb(127,188,57)
        .building
          background-color rgb(255,154,42)
      .agent-icon
        margin-right 15px
        display inline-block
        width 80px
        height 80px
    .name-wrap
      margin-bottom 10px
      text-align left
      .name
        display inline-block
        max-width 240px
        textWidthOverHidden()
        color $hover-color
        line-height 20px
          font-weight bolder
</style>
