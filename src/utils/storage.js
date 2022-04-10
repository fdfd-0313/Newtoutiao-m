/**
 * 封装本地存储模块
 */

/**
 * 存储数据
 */
export const setIem = (key, value) => {
  // 讲数组、对象类型的数据转换成 JSON 格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getIem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除数据
 */
export const removeIem = key => {
  window.localStorage.removeItem(key)
}
