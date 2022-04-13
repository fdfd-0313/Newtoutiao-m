<template>
  <van-cell class="aticle-item">
    <div
      slot="title"
      class="title van-multi-ellipsis--l2"
    >{{article.title}}</div>
    <div slot="label">
      <div
        v-if="article.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover-item"
          v-for="(img,index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            fit=cover
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span class="comment">{{article.aut_name}}</span>
        <span class="comment">{{article.comm_count}}</span>
        <span class="comment">{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      slot="default"
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>

</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  created () { },

  methods: {}
}

</script>
<style lang='less' scoped>
.aticle-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap {
    .comment {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
  .cover-wrap {
    padding: 30px 0;
    display: flex;
    .cover-item {
      &:not(:last-child) {
        padding-right: 4px;
      }
      flex: 1;
      height: 146px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
