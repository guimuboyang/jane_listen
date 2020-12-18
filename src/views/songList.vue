<template>
  <div>
    <!--头部卡片-->
    <van-card :thumb="songcardobj.coverImgUrl">
      <template #title>
        <span class="title">精品歌单</span>
      </template>
      <template #desc>
        <span class="desc">{{ songcardobj.copywriter }}</span>
      </template>
    </van-card>
    <!--弹出层标签分类-->
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '40%' }"
      closeable
      close-icon-position="bottom-right"
    >
      <van-tree-select
        :items="songclass"
        :active-id.sync="activeId"
        :height="650"
        @click-item="changeItem"
      />
    </van-popup>
    <van-button
      type="warning"
      round
      plain
      hairline
      @click="showPopup"
      class="changeClass"
    >
      切换分类
    </van-button>
    <!--歌单主体区域-->
    <div class="recommended_list">
      <div
        v-for="(item, index) in songList"
        :key="index"
        class="recommended_list_img"
      >
        <van-image
          width="100"
          height="100"
          :src="item.coverImgUrl"
          v-lazy="item"
        >
          <van-icon name="eye-o" class="playcount">
            {{ item.playCount }}
          </van-icon>
        </van-image>
        <span class="recommended_list_name"> {{ item.name }}</span>
      </div>
    </div>
    <!--分页区域-->
    <van-pagination
      v-model="currentPage"
      :total-items="total"
      :show-page-size="5"
      class="pagination"
      :items-per-page="limit"
      force-ellipses
      @change="changePage"
    >
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
      <template #page="{ text }">{{ text }}</template>
    </van-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeId: 0,
      currentPage: 1,
      songclass: [
        {
          text: "全部",
          children: [
            { text: "全部", id: 0 },
            { text: "欧美", id: 1 },
            { text: "华语", id: 2 },
            { text: "流行", id: 3 },
            { text: "说唱", id: 4 },
            { text: "摇滚", id: 5 },
            { text: "民谣", id: 6 },
            { text: "电子", id: 7 },
            { text: "轻音乐", id: 8 },
            { text: "影视原声", id: 9 },
            { text: "ACG", id: 10 },
            { text: "怀旧", id: 11 },
            { text: "治愈", id: 12 }
          ]
        }
      ],
      //歌单卡片对象
      songcardobj: {},
      //歌单列表数组
      songList: [],
      tag: "全部",
      total: 10,
      limit: 12
    };
  },
  watch: {
    tag() {
      this.getTopcardInfo();
      this.getsongList();
      this.currentPage = 1;
    }
  },
  created() {
    this.getTopcardInfo();
    this.getsongList();
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    //获取头部卡片
    async getTopcardInfo() {
      const { data: res } = await this.$http.get("top/playlist/highquality", {
        params: {
          limit: 1,
          cat: this.tag
        }
      });
      console.log(res);
      if (res.code !== 200) {
        return this.$toast("歌单卡片获取失败");
      } else {
        this.songcardobj = res.playlists[0];
      }
    },
    //获取歌单列表
    async getsongList() {
      const { data: res } = await this.$http.get("top/playlist/", {
        params: {
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit,
          cat: this.tag
        }
      });
      console.log(res);
      if (res.code !== 200) {
        return this.$toast("获取歌单列表失败");
      } else {
        this.songList = res.playlists;
        this.total = res.total;
        for (var i = 0; i < this.songList.length; i++) {
          if (this.songList[i].playCount > 10000) {
            this.songList[i].playCount =
              parseInt(this.songList[i].playCount / 10000) + "万";
          }
        }
      }
    },
    //分类
    changeItem(data) {
      console.log(data.text);
      this.tag = data.text;
    },
    //分页
    changePage() {
      this.getsongList();
    }
  }
};
</script>

<style scoped>
.title {
  display: block;
  width: 100px;
  height: 30px;
  background: #0dc264;
  color: white;
  border-radius: 10px;
  line-height: 30px;
  text-align: center;
}
.desc {
  position: relative;
  top: 15px;
  font-size: 15px;
  color: #734a31;
}
.changeClass {
  margin-top: 20px;
}
.recommended_list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.recommended_list_img {
  margin-top: 25px;
}
.recommended_list_name {
  display: block;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination {
  margin-top: 50px;
}
</style>
