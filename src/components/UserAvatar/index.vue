<template>
  <div class="UserAvatar">
    <img class="userImg" src="../../assets/avatar.png"/>
    <i class="icon icon-angle-down"></i>
    <div class="dropDialog">
      <div class="profile">
        <i class="icon icon-id-card"></i>
        <span class="profile-text">Profie</span>
      </div>
      <div class="profile">
        <i class="icon icon-sign-in"></i>
        <span class="profile-text">Sign Out</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  data() {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
  .UserAvatar
    position relative
    display flex
    align-items center
    height 55px
    .icon-angle-down
      transition all .3s ease-in-out
    &:hover>.icon
      transform rotate(-180deg)
    &:hover .dropDialog
      display block
    .dropDialog
      position absolute
      display none
      top 55px
      left -50px
      box-sizing border-box
      padding 12px 0
      width 140px
      height 94px
      background-color #FFFFFF
      color rgb(45,64,80)
      box-shadow rgba(0,0,0,.1) 0 0 10px 
      .profile
        box-sizing border-box
        display flex  
        align-items center
        padding 0 1rem
        height 35px
        background-color transparent 
        &:hover
          background-color #EFEFEF
        .icon 
          margin-right 1rem
          display inline-block
          width 1rem
          line-height 30px
    .icon-angle-down
      font-size 1.4rem
    .userImg
      display inline-block
      margin-right 1rem
      width 40px
      height 40px
      border-radius 50% 
</style>
