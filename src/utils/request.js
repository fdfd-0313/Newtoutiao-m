/*
 *请求模块
 */

import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // 接口的基准地址
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起经过这里
  // config: 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  // 注意：这里务必要返回config配置对象，否则请求就停在了这里
  return config
}, function (error) {
  // Do something with request error
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})
// 响应拦截器
export default request
