<template>
  <div class="ViewLayout">
    <i 
      v-for="({name, value}) in activeViewLayoutItems" :key="value" 
      @click="_chooseView(value)"
      :class="['icon',`icon-th-${value}`, activeViewLayout === value ? 'icon-active' : '']"></i>
  </div>
</template>

<script>
export default {
  name: 'ViewLayout',
  data() {
    return {
      activeViewLayoutItems: [
        {
          name: 'card',
          value: 'card',
        },
        {
          name: 'list',
          value: 'list',
        },
      ],
      activeViewLayout: 'list'
    }
  },
  methods: {
    // 改变视图布局
    _chooseView(value) {
      this.activeViewLayout = value
    }
  }
}
</script>


<style lang="stylus" scoped>
  @import '~common/common.styl'
  .ViewLayout
    flex-grow 1
    display flex
    height 100% 
    justify-content flex-end
    align-items center
    & .icon:not(:nth-last-child(1))
        margin-right 20px
    .icon 
      font-size 20px
      color rgb(45,64,80)
      cursor pointer
    .icon-active 
      color $hover-color
</style>
