<template>
  <div class="channel-edit">
    <!-- 频道导航 -->
    <van-cell-group :border="false">
      <van-cell>
        <div
          slot="title"
          class="title-text"
        >我的频道</div>
        <van-button
          class="edit-btn"
          round
          type="danger"
          size="mini"
          @click="isEdit=!isEdit"
          plain
        > {{isEdit ? '完成': '编辑'}}</van-button>
      </van-cell>
    </van-cell-group>
    <!-- /频道导航 -->
    <!-- 频道宫格 -->
    <van-grid
      class="my-grid"
      :gutter="10"
    >
      <van-grid-item
        class="grid-item"
        v-for="(channels,index) in mychannels"
        :key="index"
        @click="onMyChannelsClick(channels,index)"
      >
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channels.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <div
          :class="{active:index === active}"
          class="text"
          slot="text"
        >{{channels.name}}</div>
      </van-grid-item>
    </van-grid>
    <!-- /频道宫格 -->
    <!-- 频道推荐 -->
    <van-cell-group :border="false">
      <van-cell>
        <div
          slot="title"
          class="title-text"
        >频道推荐</div>
      </van-cell>
    </van-cell-group>
    <van-grid
      class="recommend-grid"
      :gutter="10"
    >
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channels,index) in recommendChannels"
        :key="index"
        :text="channels.name"
        @click="onAddChannel(channels)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setIem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    mychannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0] // 固定频道，不允许删除
    }
  },

  components: {},

  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 遍历数组，找到满足条件的元素项
        const ret = this.mychannels.find(mychannels => {
          return mychannels.id === channel.id
        })
        // 如果我的频道中不包括频道项目，则手机到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 把计算结果返回
      return channels
    }
  },

  created () {
    this.loadgetAllChannles()
  },

  methods: {
    async loadgetAllChannles () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    async onAddChannel (channel) {
      this.mychannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannels({
            id: channel.id, // 频道id
            seq: this.mychannels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地

        setIem('TOUTIAO_CHANNELS', this.mychannels)
      }
    },
    onMyChannelsClick (channels, index) {
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(index)) {
          return
        }
        // 2. 删除频道项
        this.mychannels.splice(index, 1)
        // 3. 如果是编辑状态，执行删除频道
        // 参数1： 要删除的元素的开始索引
        // 参数2： 删除的个数，如果不指定，则从参数1开始一直删除
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4. 处理持久化
        this.deleteChannle(channels)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannle (channels) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channels.id)
        } else {
          //  未登录，将数据更新到本地
          setIem('TOUTIAO_CHANNELS', this.mychannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
}

</script>
<style lang='less' scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
