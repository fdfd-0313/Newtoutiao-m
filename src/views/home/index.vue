
<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 1.通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      2.通过 animated 属性可以开启切换标签内容时的转场动画
      3.通过 swipeable 属性可以开启滑动切换标签页
      -->
    <van-tabs
      class="chanel-tabs"
      v-model="active"
      swipeable
      animated
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 频道的文章列表 -->
        <ArticleList :channel="channel">
        </ArticleList>
        <!-- /频道的文章列表 -->
      </van-tab>
      <!-- 右侧汉堡插槽 -->
      <div
        slot="nav-right"
        class="placeholder"
      ></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
      >
        <i class="Newtoutiao icon-gengduo"></i>
      </div>
      <!-- /右侧汉堡插槽 -->
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  props: {},
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },

  components: {
    ArticleList
  },

  created () {
    this.loadUserChannels()
  },

  computed: {},

  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}

</script>
<style lang='less' scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  // 导航样式
  .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      font-size: 28px;
      border: none;
    }
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  // 标签样式
  /deep/.chanel-tabs {
    .van-tabs__wrap {
      height: 82px;
      top: 92px;
      position: fixed;
      z-index: 1;
      right: 0;
      left: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 8px;
    }
  }
  // 汉堡按钮
  .hamburger-btn {
    position: fixed; //固定位置
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.Newtoutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  // 右侧占位符
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
}
</style>
