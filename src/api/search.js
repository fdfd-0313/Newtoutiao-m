/**
 * 文章搜索模块
 */
 import request from '@/utils/request'

 /* 联想建议 */
 export const getSearchSuggetion = (q) => {
   return request({
     method: 'GET',
     url: '/v1_0/suggestion',
     params: {
       q
     }
   })
 }

/* 搜索结果 */
 export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
