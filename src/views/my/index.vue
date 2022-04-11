<template>
  <div class="My-container">
    <!-- 已登录头部 -->
    <div
      v-if="user"
      class="header user-info"
    >
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            :src="userInfo.photo"
            round
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button
            class="edi-btn"
            size="mini"
            round
          > 编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>

      </div>

    </div>
    <!-- /已登录头部 -->
    <!-- 未登录头部 -->
    <div
      v-else
      class="header not-login"
    >
      <div
        class="login-btn"
        @click="$router.push('/login')"
      >
        <img
          class="mobile-img"
          src="@/assets/mobile.png"
        >
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 导航 -->
    <van-grid
      class="grid-nav"
      :column-num="2"
      clickable
    >
      <van-grid-item class="grid-item">
        <i
          slot="icon"
          class="Newtoutiao icon-shoucang"
        ></i>
        <span
          slot="text"
          class="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i
          slot="icon"
          class="Newtoutiao icon-lishi"
        ></i>
        <span
          slot="text"
          class="text"
        >历史</span>
      </van-grid-item>

    </van-grid>
    <!--/ 导航 -->
    <!-- 小智同学 -->
    <van-cell-group>
      <van-cell
        title="消息通知"
        is-link
      />
      <van-cell
        title="小智同学"
        is-link
        class="md9"
      />
    </van-cell-group>
    <!-- /小智同学 -->
    <!-- 退出登录 -->
    <van-cell
      v-if="user"
      title="退出登录"
      class="lgout-cell"
      clickable
      @click="onlogout"
    />
    <!-- /退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  props: {},
  data () {
    return {
      userInfo: {}// 用户信息
    }
  },

  components: {},

  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    onlogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗?'

      })
        .then(() => {
          // on confirm 确认执行这里
          // 确认退出：清楚登录状态（容器中数据 user + 本地存储的数据）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel 取消执行这里
        })
    },

    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}

</script>
<style lang='less' scoped>
.My-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .base-info {
    height: 231px;

    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
      }
      .name {
        color: #fff;
        font-size: 30px;
        margin-left: 23px;
      }
    }
    .right {
      .edi-btn {
        font-size: 24px;
      }
    }
  }
  .data-stats {
    // height: 130px;

    display: flex;
    .data-item {
      color: #fff;
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column; //水平分布
      justify-content: center; //水平
      align-items: center; //垂直
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.Newtoutiao {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
  .md9 {
    margin-bottom: 9px;
  }
}
</style>
