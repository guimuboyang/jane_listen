<template>
  <div>
    <!--头部搜索区域-->
    <div class="home_top">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入歌曲名或歌手名"
        left-icon="service-o"
      >
        <template #left> <span class="logo_text">简听</span></template>
        <template #action>
          <van-button
            type="primary"
            icon="search"
            size="small"
            round
            @click="searchMusic()"
          ></van-button>
        </template>
      </van-search>
    </div>
    <!--主体区域-->
    <div class="container"><router-view /></div>
    <!--导航区域-->
    <div class="nav">
      <van-tabbar route>
        <van-tabbar-item replace to="/discover" icon="home-o">
          首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/songList" icon="orders-o">
          歌单
        </van-tabbar-item>
        <van-tabbar-item replace to="/mvList" icon="video-o">
          MV
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    searchMusic() {
      this.$router.push("/searchMusic?value=" + this.searchValue);
    }
  }
};
</script>

<style scoped>
.logo_text {
  color: #07c160;
  font-size: 20px;
  font-weight: 700;
  margin-right: 10px;
}
.container {
  width: 90%;
  margin: 0 auto;
  height: 620px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
