<template>
  <div class="login-contanier">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    > </van-nav-bar>

    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form
      ref="loginForm"
      @submit="onSubmit"
    >
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          :rules="userFormRules.mobile"
        >
          <i
            slot="left-icon"
            class="Newtoutiao icon-shouji"
          ></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
        >
          <i
            slot="left-icon"
            class="Newtoutiao icon-yanzhengma"
          > </i>
          <template #button>
            <!-- time:倒计时时间 -->
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 5"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-else
              @click="onSendSms"
              native-type="button"
              class="send-sms-btn"
              round
              size="small"
              type="default"
            >发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 展示倒计时
    }
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 在组件中必须通过 this.$toast 来调用Toast组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击

        duration: 0// 持续时间默认两秒，如果为0持续展示
      })
      // 3.提交表单请求登录
      try {
        await login(user)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录手机号或验证码错误')
          console.log('登录失败', err)
        } else { this.$toast.fail('登录失败，请稍后重试') }

        // 4.根据请求响应结果处理后续操作
      }
    },
    async onSendSms () {
      console.log('onSendms')
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true

      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }

  }
}

</script>
<style lang='less' scoped>
.login-contanier {
  .Newtoutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
