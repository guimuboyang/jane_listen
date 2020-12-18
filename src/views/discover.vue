<template>
  <div>
    <!--轮播图区域-->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <img :src="image.pic" class="banner_image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="container">
      <!--推荐歌单区域-->
      <h2>推荐歌单</h2>
      <div class="recommended_list">
        <div
          v-for="(item, index) in recommendList"
          :key="index"
          class="recommended_list_img"
        >
          <van-image
            width="100"
            height="100"
            :src="item.picUrl"
            v-lazy="item"
            radius="5px"
          >
            <van-icon name="eye-o" class="playcount">
              {{ item.playCount }}
            </van-icon>
          </van-image>
          <span class="list_name">
            {{ item.name }}
          </span>
        </div>
      </div>
      <!--最新歌曲区域-->
      <h2>最新歌曲</h2>
      <div class="newsong_list">
        <div
          v-for="(item, index) in newsongList"
          :key="index"
          v-lazy="item"
          class="newsong_img"
        >
          <van-image width="100" height="100" :src="item.picUrl" round>
            <van-button
              type="primary"
              size="mini"
              round
              class="play_btn"
              icon="play"
            ></van-button>
          </van-image>
          <span class="newsong_singer">{{ item.song.artists[0].name }}</span
          ><br />
          <span class="newsong_songname">{{ item.name }}</span>
        </div>
      </div>
      <!--推荐MV区域-->
      <h2>推荐MV</h2>
      <div class="mv_List">
        <div
          class="mv_list_img"
          v-for="(item, index) in mvList"
          :key="index"
          v-lazy="item"
        >
          <van-image width="150" height="100" :src="item.picUrl" radius="5px">
            <van-button
              type="primary"
              size="mini"
              round
              class="play_btn"
              icon="play"
            ></van-button>
          </van-image>
          <span class="mv_list_name">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数组
      bannerList: [],
      //推荐歌单数组
      recommendList: [],
      //最新歌曲数组
      newsongList: [],
      //推荐MV数组
      mvList: []
    };
  },
  created() {
    this.getBannerList();
    this.getrecommendedList();
    this.getnewsongList();
    this.getmvList();
  },
  methods: {
    //获取轮播图
    async getBannerList() {
      const { data: res } = await this.$http.get("/banner", {
        params: {
          type: 1
        }
      });
      if (res.code !== 200) {
        return this.$toast("轮播图获取失败");
      } else {
        this.bannerList = res.banners;
      }
    },
    //获取推荐歌单
    async getrecommendedList() {
      const { data: res } = await this.$http.get("/personalized", {
        params: {
          limit: 6
        }
      });
      if (res.code !== 200) {
        return this.$toast("推荐歌单获取失败");
      } else {
        this.recommendList = res.result;
        for (var i = 0; i < this.recommendList.length; i++) {
          if (this.recommendList[i].playCount > 10000) {
            this.recommendList[i].playCount =
              parseInt(this.recommendList[i].playCount / 10000) + "万";
          }
        }
      }
    },
    //获取最新歌曲
    async getnewsongList() {
      const { data: res } = await this.$http.get("personalized/newsong");
      if (res.code !== 200) {
        return this.$toast("获取最新歌曲失败");
      } else {
        this.newsongList = res.result;
      }
    },
    //获取推荐MV
    async getmvList() {
      const { data: res } = await this.$http.get("personalized/mv");
      console.log(res);
      if (res.code !== 200) {
        return this.$toast("推荐MV获取失败");
      } else {
        this.mvList = res.result;
      }
    }
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 200px;
  margin: 0 auto;
}
.banner_image {
  width: 100%;
  height: 200px;
  border-radius: 10px;
}
h2 {
  font-size: 25px;
  color: #07c160;
  margin-top: 25px;
  font-weight: 700;
}
.recommended_list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.recommended_list_img {
  margin-top: 25px;
}
.newsong_list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.newsong_img {
  width: 170px;
  margin-top: 25px;
  position: relative;
}

.newsong_singer {
  position: absolute;
  left: 100px;
  top: 60px;
  color: #808080;
  font-size: 15px;
}
.newsong_songname {
  display: block;
  width: 70px;
  position: absolute;
  left: 100px;
  top: 10px;
  color: black;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mv_List {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mv_list_img {
  height: 150px;
  margin-top: 25px;
}
.mv_list_name {
  display: block;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
