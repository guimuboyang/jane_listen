<template>
  <div>
    <van-tabs v-model="active" animated :swipeable="true">
      <van-tab title="歌曲">
        <!--歌曲列表区域-->
        <van-list
          v-model="songloading"
          :finished="songfinished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
        >
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            :title="item.name"
            :label="item.artists[0].name"
          >
            <van-button
              type="danger"
              icon="video"
              size="mini"
              plain
              round
              v-if="item.mvid !== 0"
            ></van-button>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="歌单">
        <!--歌单列表区域-->
        <van-list
          v-model="songListloading"
          :finished="songListfinished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
          :immediate-check="false"
        >
          <van-cell
            v-for="(item1, index) in songlist"
            :key="index"
            class="songlist_cell"
            is-link
            size="large"
            @click="tosonglist_detail()"
            :title="item1.name"
            :label="item1.description"
          >
            <template #icon>
              <img :src="item1.coverImgUrl" class="songList_img" />
            </template>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="MV">
        <!--MV列表区域-->
        <van-list
          v-model="songListloading"
          :finished="songListfinished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="100"
          :immediate-check="false"
        >
          <van-cell
            v-for="(item2, index) in mvlist"
            :key="index"
            class="songlist_cell"
            is-link
            size="large"
            :title="item2.name"
            :label="item2.artistName"
          >
            <template #icon>
              <img :src="item2.cover" class="mvList_img" />
            </template>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      limit: 20,
      page: 1,
      total: 0,
      //歌曲列表
      list: [],
      songloading: false,
      songfinished: false,
      songerror: false,
      //歌单列表
      songlist: [],
      songListloading: false,
      songListfinished: false,
      //MV列表
      mvlist: [],
      mvListloading: false,
      mvListfinished: false
    };
  },
  methods: {
    //获取歌曲列表
    async getsongonLoad() {
      let type = 1000;
      let limit = 20;
      switch (this.active) {
        case 0:
          type = 1;
          limit = 20;
          break;
        case 1:
          type = 1000;
          limit = 20;
          break;
        case 2:
          type = 1004;
          limit = 20;
          break;
        default:
          break;
      }
      console.log(type);
      const { data: res } = await this.$http.get("/search", {
        params: {
          keywords: this.$route.query.value,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
          type
        }
      });
      if (res.code !== 200) {
        return this.$toast("歌曲获取失败");
        this.songfinished = true;
      } else if (type == 1) {
        console.log(res);
        this.total = res.result.songCount;
        this.list.push(...res.result.songs);
        this.songloading = false;
        if (this.list.length >= this.total) {
          this.songfinished = true;
        }
      } else if (type == 1000) {
        console.log(res);
        this.total = res.result.playlistCount;
        this.songlist.push(...res.result.playlists);
        this.songListloading = false;
        if (this.songlist.length >= this.total) {
          this.songListfinished = true;
        }
      } else {
        console.log(res);
        this.total = res.result.mvCount;
        this.mvlist.push(...res.result.mvs);
        this.mvListloading = false;
        if (this.mvlist.length >= this.total) {
          this.mvListfinished = true;
        }
      }
    },
    // 异步更新歌曲列表数据
    onLoad() {
      console.log(123);
      let timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getsongonLoad(); // 调用上面方法,请求数据
        this.page++;
        this.songfinished &&
          this.songListfinished &&
          this.mvListfinished &&
          clearTimeout(timer); //清除计时器
      }, 100);
    },
    //跳转歌单详情页
    tosonglist_detail() {
      this.$router.push("/songList_detail");
    }
  },
  watch: {
    $route() {
      if (this.$route.query.value) {
        this.list = [];
        this.songlist = [];
        this.mvlist = [];
        this.getsongonLoad();
      }
    },
    active() {
      this.list = [];
      this.songlist = [];
      this.mvlist = [];
      this.page = 1;
      this.getsongonLoad();
    }
  },
  created() {
    this.getsongonLoad();
  }
};
</script>

<style scoped>
.songList_img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.mvList_img {
  width: 100px;
  height: 50px;
  border-radius: 10px;
}
.van-cell__title {
  display: block;
  width: 168px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 20px;
}
.van-cell__label {
  display: block;
  width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
