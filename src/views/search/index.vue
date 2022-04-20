<template>
  <div class="search-contanier">
    <!-- 搜索栏 -->
    <form
      class="search-form"
      action="/"
    >
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @focus="isResultShow=false"
        @search="onSearch"
        @cancel="onCancel"
      />
      <!-- /搜索栏 -->
    </form>
    <!-- 搜索结果展示 -->
    <SearchRusult
      v-if="isResultShow"
      :search-text="searchText"
    ></SearchRusult>
    <!-- /索结果展示 -->

    <!-- 搜索联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- /搜索联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @clearSearchHistories="searchHistories = []"
      @onsearch="onSearch"
    ></SearchHistory>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchRusult from './components/search-result'
import { setIem, getIem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      searchHistories: getIem('TOUTIAO_HISTORIES') || [] // 展示历史记录
    }
  },

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchRusult
  },

  computed: {},
  watch: {
    searchHistories (value) {
      // console.log('hhh')
      setIem('TOUTIAO_HISTORIES', value)
    }
  },

  methods: {
    onSearch (value) {
      // console.log(value)
      // 更新搜索历史记录
      this.searchText = value

      // 存储历史数据要求
      // 要求：不要有重复的历史记录，最新的历史记录排在最前面
      // indexof 函数，找到即返回value下标，找不到返回 -1
      const index = this.searchHistories.indexOf(value)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(value)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}

</script>
<style lang='less' scoped>
.search-contanier {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
