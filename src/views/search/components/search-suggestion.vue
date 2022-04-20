<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text,index) in suggetion"
      :key="index"
      icon="search"
      @click="$emit('search',text)"
    >
      <div
        slot="title"
        v-html="highlight(text)"
      ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggetion: [], // 联想提示的内容
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },

  components: {},

  computed: {},
  watch: {
    // 当 searchText 发生改变的时候就会调用 handler 函数
    // 注意：handler 函数名称是固定的
    searchText: {
      // js 函数完整写法
      handler: debounce(function (value) {
        // console.log(value)
        this.loadgetSearchSuggetion(value)
      }, 200),
      // es6省略写法
      // handler (value) {
      //   this.loadgetSearchSuggetion(value)
      // },
      immediate: true
    }
  },

  created () { },

  methods: {
    async loadgetSearchSuggetion (q) {
      try {
        const { data } = await getSearchSuggetion(q)
        this.suggetion = data.data.options
        // console.log(data)
      } catch (err) {
        this.$toast('联想建议获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const higlightStr = `<span class="active">${this.searchText}</span>`
      // 正式表达式 // 中间的内容都会当做匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态创建正则表达式，则手动 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, higlightStr)
    }
  }
}

</script>
<style lang='less' scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
