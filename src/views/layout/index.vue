<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <van-tabbar
      class="layout-tabbar"
      route
    >
      <van-tabbar-item to="/">
        <i
          slot="icon"
          class="Newtoutiao icon-shouye"
        ></i>
        <span class="text">首页</span>

      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i
          slot="icon"
          class="Newtoutiao icon-wenda"
        ></i>
        <span class="text">问答</span>

      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i
          slot="icon"
          class="Newtoutiao icon-shipin"
        ></i>
        <span class="text">视频</span>

      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i
          slot="icon"
          class="Newtoutiao icon-wode"
        ></i>
        <span class="text">{{$store.state.user ? '我的':'未登录'}}</span>

      </van-tabbar-item>

    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  props: {},
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.layout-container {
  .layout-tabbar {
    i.Newtoutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 24px;
    }
  }
}
</style>
