import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant 核心组件库
import Vant from 'vant'

// 加载 Vant 全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './style/index.less'

// 加载动态设置Rem 基准值
import 'amfe-flexible'

// 加载 moment 初始化配置
import './utils/moment'

// 注册使用Vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
