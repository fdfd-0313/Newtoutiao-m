/*
 *请求模块
 */

import axios from 'axios'
// import store from '@/store'
const request = axios.create({
  // 接口的基准地址
  baseURL: 'http://toutiao.itheima.net'
})

export default request
