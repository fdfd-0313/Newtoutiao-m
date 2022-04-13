import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'

// 默认语言是英文，需要配置为中文
moment.locale('zh-cn')

// var moment = require('moment')
// 定义一个全局过滤器
// 其实过滤器就相当于一个全局可用的方法（仅供模板使用）
// 使用方法：{{表达式 | 过滤器名称}}
// 管道符前面的表达式结果会作为参数传入到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return moment('20210412', 'YYYYMMDD').fromNow()
})
