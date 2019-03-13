<template>
  <div class="Agent">
    <img class="agent-icon" :src="`static/icons/${agent.os}.png`" alt="">
    <div class="agent-detail">
      <div class="agent-detail-text">
        <div class="wrap name-wrap">
          <i class="icon icon-desktop"></i>
          <span class="name">{{agent.name}}</span>
        </div>
        <span :class="`status ${agent.status}`">{{agent.status}}</span>
        <div class="wrap ip-wrap">
          <i class="icon icon-info"></i>
          <span class="text">{{agent.ip}}</span>
        </div>
        <div class="wrap folder-wrap">
          <i class="icon icon-folder"></i>
          <span class="text">{{agent.location}}</span>
        </div>
      </div>
      <div class="agent-detail-resource">
        <el-popover
          ref="agentPopover"
          popper-class="agent-popover"
          placement="bottom-start"
          width="570"
          @hide="_clearPopover"
          trigger="click">
          <div class="popover-wrap">
            <div class="closeBtn-wrap">
              <i class="close-btn icon-close" @click="_closePopover"></i>
            </div>
            <p class="popover-text">Separate multiple resource name with commas</p>
            <el-input 
              ref="popoverInput"
              autofocus
              class="popover-inner-input" 
              placeholder="e.g Chrome,Firefox"
              v-model="userInputResourceTag"></el-input>
            <div class="popover-btn-wrap">
              <span class="btn add-resource" @click="_addResource">Add Resources</span>
              <span class="btn cancel" @click="_closePopover">Cancel</span>
            </div>
          </div>
          <div class="add-btn" slot="reference">
            <i class="icon icon-plus"></i>
          </div>
        </el-popover>
        <div class="resource-item-wrap">
          <div class="resource-item" v-for="item in resourcesRender" :key="item + Math.random()">
            <span class="itemName">{{item}}</span>
            <i class="icon icon-trash" @click="_deleteResourceTag(item)"></i>
          </div>
          <div class="resource-item-over" v-if="agent.resources.length > 5">
            <span class="itemName">...</span>
          </div>
        </div>
        <div class="deny-btn" v-if="agent.status === 'building'">
          <i class="icon icon-deny"></i>
          <span>Deny</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceJudge } from '@/utils/tools'
export default {
  name: 'Agent',
  props: {
    // agent对象
    agent: {
      type: Object,
      required: true,
      default: ()=> {}
    }
  },
  computed: {
    // 考虑到标签数过多的情况，超过5个即做隐藏处理
    resourcesRender() {
      return this.agent.resources.slice(0,5)
    }
  },
  data() {
    return {
      userInputResourceTag: ''
    }
  },
  methods: {
    _addResource() {
      // 校验输入是否合法(demo仅考虑是否为空字符串)
      // 判断是否新增tag已存在
      const {canBeAdded, message} = resourceJudge(this.userInputResourceTag, this.agent.resources)
      if(!canBeAdded) return
      // 解析输入字符串
      const tagArr = this.userInputResourceTag.split(',')
      const newResourceArr = [...this.agent.resources, ...tagArr]
      const postResource = {...this.agent, ...{resources: newResourceArr} }
      this.$emit('add-resource', postResource)
      this._closePopover()
    },
    // 删除资源的指定标签
    _deleteResourceTag(tag) {
      const newResourceArr = this.agent.resources.filter(i => i !== tag)
      const postResource = {...this.agent, ...{resources: newResourceArr} }
      this.$emit('delete-resource', postResource)
    },
    // 手动关闭popover
    _closePopover() {
      if(this.$refs.agentPopover) this.$refs.agentPopover.doClose()
      this._clearPopover()
    },
    // 清除popover输入框中的文本
    _clearPopover() {
      this.userInputResourceTag = ''
    }

  }
}
</script>
<style lang="stylus">
  @import '~common/common.styl'
  .agent-popover
    box-sizing border-box
    padding 12px 16px
    height 158px
    border-color $hover-color
    .popper__arrow
      border-bottom-color $hover-color !important
    .popover-wrap
      .popover-inner-input
        .el-input__inner
          height 36px
          border-color rgb(151,151,151)
          box-shadow inset 0 1px 2px
      .add-resource
        background-color $hover-color
        &:active 
          background-color rgb(1,134,154)
      .cancel
        background-color rgb(67,84,102)
        &:active 
          background-color rgb(45,64,84)
      .btn 
        display inline-block
        margin-right 20px
        width 128px
        height 30px
        line-height 30px
        text-align center
        color #FFF
        cursor pointer
      .popover-inner-input
        margin-bottom 18px
      .popover-text
        margin-bottom 10px
      .closeBtn-wrap
        text-align right
        .close-btn 
          font-size 20px
          color $hover-color
          cursor pointer
</style>

<style lang="stylus" scoped>
  @import '~common/common.styl'
  .Agent
    box-sizing border-box
    margin-bottom 14px
    padding 20px 25px 15px
    display flex
    align-items center 
    width 100%
    height 110px
    background-color #FFF
    .agent-detail
      flex-grow 1
      display flex 
      flex-direction column
      justify-content space-between
      height 100%
      .icon 
        line-height 26px
      .agent-detail-resource
        display flex 
        align-items flex-end
        .deny-btn
          flexTextWrap()
          justify-content center
          height 30px
          width 90px
          background-color $hover-color
          color #FFF 
          font-size 14px
          cursor pointer
          &:active 
            background-color $btn-active
          .icon
            margin-right 10px
        .resource-item-wrap
          flex-grow 1
          display flex
          .resource-item-over
            flexTextWrap()
            justify-content center
            box-sizing border-box
            margin-right 10px
            padding 0 8px
            margin-right 10px
            width 60px
            height 26px
            background-color rgb(239,239,239)
            .itemName
              max-width 58px
          .resource-item
            flexTextWrap()
            justify-content center
            box-sizing border-box
            margin-right 10px
            padding 0 8px
            margin-right 10px
            width 88px
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
        .add-btn
          margin-right 10px
          width 26px
          height 26px
          background-color $hover-color
          text-align center
          font-size 16px
          color #FFF
          cursor pointer
          &:active 
            background-color $btn-active
      .agent-detail-text
        flexTextWrap()
        height 20px
        .status
          margin-right 35px
          padding 2px 10px
          color #FFF
        .idle
          background-color rgb(127,188,57)
        .building
          background-color rgb(255,154,42)
        .ip-wrap
          margin-right 18px
        .name-wrap
          margin-right 28px
          .name
            display inline-block
            max-width 240px
            textWidthOverHidden()
            color $hover-color
            line-height 20px
            font-weight bolder
        .wrap
          flexTextWrap()
        .text 
          font-size 14px
          color $default-color
        .icon
          margin-right 10px
          font-size 16px
          line-height 20px
          color rgb(153,153,153)
    .agent-icon
      margin-right 38px
      display inline-block
      width 80px
      height 80px
</style>
