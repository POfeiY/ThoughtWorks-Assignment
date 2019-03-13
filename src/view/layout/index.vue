<template>
  <div class="layout">
    <header class="grid-header header">
      <div class="header-content">
        <div class="company-icon">
          <svg-icon icon-class="logo"></svg-icon>
        </div>
        <div class="user-avatar">
          <user-avatar></user-avatar>
        </div>
      </div>
    </header>
    <section class="grid-content content">
      <aside class="content-aside">
        <div class="router-wrap">
          <div 
            :class="['routerItem', activeRouter === text ? 'routerItem-active' : '']" 
            @click="_chooseRouter(text)"
            v-for="({text, icon}) in routerItemsRender" 
            :key="text">
            <i :class="[`${icon}`, 'router-icon']"></i>
            <span class="router-text">{{text}}</span>
          </div>
        </div>
        <div class="history-wrap">
          <p class="history-title">History</p>
          <div class="history-item-wrap">
            <ul>
              <li class="history-item" v-for="item in historyRender" :key="item + Math.random()">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</li>
            </ul>
          </div>
        </div>
      </aside>
      <section class="content-main">
        <div class="StatisticsItemWrap">
          <statistics-item 
            :itemName="'Building'"
            :totalAmount="buildingCount"
            :backIcon="'icon-cog'"
            :isOpenAnimation="true"
            :backColor="'rgb(255,185,0)'"/>
          <statistics-item 
            :itemName="'Idle'"
            :totalAmount="idleCount"
            :backIcon="'icon-coffee'"
            :backColor="'rgb(127,188,57)'"/>
          <div class="all-count">
            <div class="count-item" >
              <p class="countName">ALL</p>
              <!-- <p class="countValue">{{physicalCount + virtualCount}}</p> -->
              <p class="countValue">
                <count-to :start-val="0" :end-val="physicalCount + virtualCount" :duration="600"></count-to>
              </p>
            </div>
            <div class="count-item" >
              <p class="countName">PHYSICAL</p>
              <p class="countValue">
                <count-to :start-val="0" :end-val="physicalCount" :duration="400"></count-to>
              </p>
            </div>
            <div class="count-item" >
              <p class="countName">VIRTUAL</p>
              <p class="countValue">
                <count-to :start-val="0" :end-val="virtualCount" :duration="400"></count-to>
              </p>
            </div>
          </div>
        </div>
        <div class="filterToolBar">
          <div class="filterCondition">
            <span 
              :class="['filterText', activeFilter === value ? 'filterText-active' : '']"
              @click="_chooseFilter(value)"  
              v-for="({label, value}) in filterConditions" 
              :key="value">{{label}}</span>
          </div>
          <div class="search-view">
            <search-wrap @filter-change="_filterChange"/> 
            <view-layout/>
          </div>
        </div>
        <div class="dataListWrap">
          <GeminiScrollbar 
            ref="scrollbar"  
            class="tw-scroll-bar" 
            @ready="_readyScrollbar" 
            :autoshow="true" 
            :forceGemini="false">
            <p class="no-data" v-if="renderAgents.length === 0">The data you are searching for has not been retrieved yet...</p>
            <template v-else>
              <Agent 
                v-for="item in renderAgents" 
                @delete-resource="_modifyResource"
                @add-resource="_modifyResource"
                :agent="item" 
                :key="item.id"/>
            </template>
          </GeminiScrollbar>
        </div>
      </section>
    </section>
    <footer class="grid-footer footer">
      <span class="copyright"><span class="copyright-icon">&copy;</span> Copyright 2019 <span class="text-bolder">Thought</span>Works</span>
    </footer>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import UserAvatar from '@/components/UserAvatar'
import SearchWrap from '@/components/SearchWrap'
import StatisticsItem from '@/components/StatisticsItem'
import ViewLayout from '@/components/ViewLayout'
import Agent from '@/components/Agent'
import CountTo from 'vue-count-to'
import api from '@/api'
export default {
  name: 'Layout',
  components: {
    SvgIcon,
    UserAvatar,
    StatisticsItem,
    SearchWrap,
    ViewLayout,
    Agent,
    CountTo
  },
  created(){
    this._getResource()
  },
  computed: {
    renderAgents() {
      return this.activeFilter === 'all'
              ? this.agents.filter(i => i.name.includes(this.filterString) )
              : this.agents.filter(i => i.type === this.activeFilter && i.name.includes(this.filterString))
    },
    routerItemsRender() {
      return this.routerItems.map(({text, icon}) => {
        return {
          text: text.toUpperCase(),
          icon
        }
      })
    },
    buildingCount() {
      return this.agents.filter(i => i.status === 'building').length
    },
    idleCount() {
      return this.agents.filter(i => i.status === 'idle').length
    },
    physicalCount() {
      return this.agents.filter(i => i.type === 'physical').length
    },
    virtualCount() {
      return this.agents.filter(i => i.type === 'virtual').length
    },
    historyRender() {
      return this.agents.map(i => `${i.name.split('.')[0]}/Acceptance_test`)
    }
  },
  data() {
    return {
      routerItems: [
        {
          text: 'dashboard',
          icon: 'icon-dashboard',
        },
        {
          text: 'agent',
          icon: 'icon-sitemap',
        },
        {
          text: 'my cruise',
          icon: 'icon-boat',
        },
        {
          text: 'help',
          icon: 'icon-life-bouy',
        },
      ],
      countItems: [
        {
          countName: 'ALL',
          countValue: 8
        },
        {
          countName: 'PHYSICAL',
          countValue: 4
        },
        {
          countName: 'VIRTUAL',
          countValue: 4
        },
      ],
      filterConditions: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Physical",
          value: "physical",
        },
        {
          label: "Virtual",
          value: "virtual",
        },
      ],
      activeFilter: 'all',
      agents: [],
      activeRouter:'AGENT',
      filterString: ''
    }
  },
  methods: {
    // 自定义滚动条回调
    _readyScrollbar(scroll) { },
    // 路由切换（模拟）
    _chooseRouter(val) {
      this.activeRouter = val
    },
    // 修改指定资源
    async _modifyResource(newResource) {
      try {
        const { data, status } = await api.modifyResource({data: newResource})
        if(status == 200) {
          this.$notify({
            title: 'Success',
            message: 'Successful resource modification',
            type: 'success'
          })
          this._getResource()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 选择筛选条件
    _chooseFilter(filter) {
      this.activeFilter = filter
    },
    // 获取服务器数据
    async _getResource() {
      try {
        const { data, status } = await api.getResource()
        if(status === 200) this.agents = [...data]
      } catch (error) {
        console.log(error)
      }
    },
    // 筛选关键字
    _filterChange(filter) {
      this.filterString = filter
    }
  }
}
</script>
<style lang="stylus">
  @import '~common/scrollbar.styl'
</style>
<style lang="stylus" scoped>
  @import '~common/common.styl'
  .layout
    display grid
    height 100%
    font-size 14px
    color $default-color
    grid-template-columns 1fr 1170px 1fr        
    grid-template-rows 70px 1fr 30px
    .grid-header
      grid-column 1/4
      grid-row 1/2
    .grid-content
      grid-column 2/3
      grid-row 2/3
    .grid-footer
      grid-column 1/4
      grid-row 3/4
    .content-main
      box-sizing border-box
      padding-top 20px
      background-color #FFFFFF
      .dataListWrap
        margin-top 18px
        max-height calc(100vh - 326px)
        overflow-y auto
        .no-data 
          font-size 16px
          text-align center 
          color $default-color
      .filterToolBar
        display flex
        height 54px
        .search-view
          flex-grow 1
          display flex
          box-sizing border-box
          padding 0 30px
          align-items center
          justify-content space-between
          background-color #FFF
        .filterCondition
          display flex
          width 31%
          height 100%
          font-size 0
          .filterText
            width 33.33%
            margin-right 1px
            display inline-block
            box-sizing border-box
            height 100%
            background-color #FFF
            line-height 54px
            text-align center
            color $default-color
            font-size $default-size
            border-bottom 3px solid transparent
            cursor pointer
            &:hover 
              border-bottom 3px solid $hover-color
              color $hover-color
          .filterText-active
            border-bottom 3px solid $hover-color
            color $hover-color
      .StatisticsItemWrap
        margin-bottom 18px
        display flex
        justify-content space-between
        .all-count
          display flex
          align-items center
          box-sizing border-box
          padding 18px 10px 20px
          width 31%
          height 116px
          background #FFFFFF
          .count-item
            width 33.3%
            .countName
              width 100%
              height 48px
              fontSize 12px
              line-height 48px
              text-align center
            .countValue
              width 100%
              height 48px
              font-size 20px
              font-weight bolder
              line-height 48px
              text-align center
    .footer
      z-index 1
      background-color #FFFFFF
      box-shadow 0 -3px 5px rgba(0,0,0,.1)
      .copyright
        line-height 30px
        .copyright-icon
          font-size 12px
        .text-bolder
          font-weight 600 
    .content
      display flex 
      height 100%
      .content-aside
        box-sizing border-box
        display flex 
        flex-direction column
        justify-content space-between
        padding-top 1.6rem
        margin-right 3rem
        width 270px
        background rgb(45,64,84)
        .history-wrap
          max-height 50%
          .history-title
            box-sizing border-box 
            padding 0 15px
            color #CCC
            font-size 24px
            text-align left
          .history-item-wrap
            box-sizing border-box 
            padding 0 15px
            &>ul 
              padding-left 0
              list-style none
              .history-item 
                margin-bottom 12px
                max-width 215px
                font-size 12px
                color #999
                text-align left
                textWidthOverHidden()
                &:hover
                  color $hover-color
        .routerItem
          box-sizing border-box
          margin-bottom 1rem
          padding-left 32px
          display flex
          align-items center
          height 45px
          background-color transparent
          color #FFFFFF
          font-size 14px
          cursor pointer
          .router-icon
            font-size 20px
          .router-text
            margin-left 1rem
            line-height 45px
          &:hover 
            background-color rgb(67,84,102)
            color rgb(0,180,207)
        .routerItem-active
          color $hover-color
          background-color rgb(67,84,102)
      .content-main
        display flex 
        flex-direction column
        width 870px
        height 100%
        background transparent
    .header
      background-color #FFFFFF
      box-shadow 0 3px 5px rgba(0,0,0,.1)
      z-index 2
      .header-content
        position relative
        margin 0 auto
        display flex
        justify-content center
        align-items center
        width 1170px
        height 100%
        .user-avatar
          position absolute
          right 28px
          cursor pointer
</style>
