<template>
  <div>
    <!--顶部卡片区域-->
    <van-card
      desc="简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介"
      title="MC:爱情是场赌注,怪我执迷不悟"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    >
      <template #tags>
        <van-tag plain type="success">标签</van-tag>
        <van-tag plain type="success">标签</van-tag>
      </template>
    </van-card>
    <!--歌曲评论区域-->
    <van-tabs v-model="active">
      <van-tab title="歌曲">
        <!--歌曲列表区域-->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="searchMusic()"
        >
          <van-cell v-for="item in list" :key="item" :title="item">
            {{ item }}
            <van-button
              type="danger"
              icon="video"
              size="mini"
              plain
              round
            ></van-button>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="评论"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style></style>
