module.exports = {
  // 配置要使用的Postcss插件
  plugins: {
    // 配置使用autoprefixer插件
    // 作用：生成浏览器CSS样式规则前缀
    // vue-cli 内部已经配置了 autoprefixer插件
    // 'autoprefixer': {
    // 配置要兼容到的环境变量
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    // 配置使用 postcss-pxyorem 插件
    // 把px转换成rem
    'postcss-pxtorem': {
      // lib-flexible 的 REM 适配方案：把一行分为10份，每份局势十分之一
      // 所以，rootValue 应该是设置为你的设计稿的宽度的十分之一
      // 我们设计稿是750，所以应该设置为750/10
      // rootValue: 37.5
      // 如果是 Vant 的样式，就把 rootValue`设置为 37.5 来转换
      // 如果是我们的样式，就按照 75 的 rootValue来转换
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // 配置要转换的Css属性
      // * 表示所有
      propList: ['*']
    }
  }
}
