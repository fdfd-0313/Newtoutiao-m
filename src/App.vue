<template>
  <div id="app">
    <h1>项目头条</h1>
    <!-- 路由的出口 -->
    <router-view />
    <div>
      <i class="Newtoutiao icon-shipin"></i>
    </div>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
</style>
