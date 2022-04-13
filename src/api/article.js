/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取频道对应的文章列表
 */
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
