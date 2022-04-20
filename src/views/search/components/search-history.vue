<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearSearchHistories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow= false"> 完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow= true"
      />
    </van-cell>
    <van-cell
      v-for="(item,index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item,index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除状态 false即表示不要删除
    }
  },

  components: {},

  computed: {},

  created () { },

  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除记录，进入搜索页面
        this.$emit('onsearch', item)
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
