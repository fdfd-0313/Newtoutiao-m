<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article,index) in list"
          :key="index"
          :article="article"
        >
        </ArticleItem>
        <!-- <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 控制列表加载失败提示状态
      isreFreshLoading: false, // 控制下来刷新控制状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  components: {
    ArticleItem
  },

  computed: {},

  created () { },

  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onRefresh () {
      try {
        // 请求数据
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道ID
          // 下拉刷新，请求获取最新数据和时间戳
          timestamp: Date.now()
        })
        // 模拟错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('dhihihi')
        // }
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下来刷新的 loading 状态
        this.isreFreshLoading = false
        // 更新下拉刷新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    },
    async onLoad () {
      try {
        // 1.请求数据
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道ID
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          timestamp: this.timestamp || Date.now()
        })
        // 模拟错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('dhihihi')
        // }
        // console.log(data)
        // 2.把请求结果数据放到list中
        const { results } = data.data
        // ... 是数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3.本次数据加载结束后，要把加载状态结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        //  展示错误提示状态
        this.error = true
        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    }
    // onLoad () {
    //   // console.log('on')
    //   // 1.请求数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     // 2.把请求结果数据放到list中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 3.本次数据加载结束后，要把加载状态结束
    //     //  loading 关闭以后才能触发下一次加载更多
    //     this.loading = false

    //     // 4.判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据了，把 finishied 设置为 false，之后不会触发更多
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}

</script>
<style lang='less' scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
