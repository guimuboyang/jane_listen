<template>
  <div>
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
    <!--MV区域-->
    <div class="mv_List">
      <div
        class="mv_list_img"
        v-for="(item, index) in mvList"
        :key="index"
        v-lazy="item"
      >
        <van-image width="150" height="100" :src="item.cover" radius="10px">
          <van-button
            type="primary"
            size="mini"
            round
            class="play_btn"
            icon="play"
          ></van-button>
          <van-icon name="eye-o" class="playcount">
            {{ item.playCount }}
          </van-icon>
          <van-icon name="play" class="time">
            {{ item.duration }}
          </van-icon>
        </van-image>
        <span class="list_name">
          {{ item.name }}
        </span>
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
    <!--弹出层标签分类-->
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '40%' }"
      closeable
      close-icon-position="bottom-right"
    >
      <van-tree-select
        :items="mvclass"
        :active-id.sync="activeId"
        :height="300"
        @click-item="changeItem"
      />
      <van-tree-select
        :items="mvclass1"
        :active-id.sync="activeId1"
        :height="300"
        @click-item="changeItem1"
      />
      <van-tree-select
        :items="mvclass2"
        :active-id.sync="activeId2"
        :height="150"
        @click-item="changeItem2"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeId: 1,
      activeId1: 1,
      activeId2: 1,
      currentPage: 1,
      mvclass: [
        {
          text: "地区",
          children: [
            { text: "全部", id: 1 },
            { text: "内地", id: 2 },
            { text: "港台", id: 3 },
            { text: "欧美", id: 4 },
            { text: "日本", id: 5 },
            { text: "韩国", id: 6 }
          ]
        }
      ],
      mvclass1: [
        {
          text: "类型",
          children: [
            { text: "全部", id: 1 },
            { text: "官方版", id: 2 },
            { text: "原声", id: 3 },
            { text: "现场版", id: 4 },
            { text: "网易出品", id: 5 }
          ]
        }
      ],
      mvclass2: [
        {
          text: "排序",
          children: [
            { text: "上升最快", id: 1 },
            { text: "最新", id: 2 },
            { text: "最热", id: 3 }
          ]
        }
      ],
      mvList: [],
      area: "全部",
      type: "全部",
      order: "上升最快",
      limit: 12,
      total: 0
    };
  },
  watch: {
    area() {
      this.getmvList();
    },
    type() {
      this.getmvList();
    },
    order() {
      this.getmvList();
    },
    activeId() {
      this.currentPage = 1;
    },
    activeId1() {
      this.currentPage = 1;
    },
    activeId2() {
      this.currentPage = 1;
    }
  },
  created() {
    this.getmvList();
  },
  methods: {
    //获取MV
    async getmvList() {
      const { data: res } = await this.$http.get("mv/all", {
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit
        }
      });
      console.log(res);
      if (res.code !== 200) {
        return this.$toast("MV获取失败");
      } else {
        this.mvList = res.data;
        if (res.count) {
          this.total = res.count;
        }
        for (var i = 0; i < this.mvList.length; i++) {
          if (this.mvList[i].playCount > 10000) {
            this.mvList[i].playCount =
              parseInt(this.mvList[i].playCount / 10000) + "万";
          }
          let min = parseInt(this.mvList[i].duration / 1000 / 60);
          let sec = parseInt((this.mvList[i].duration / 1000) % 60);
          if (min < 10) {
            min = `0${min}`;
          }
          if (sec < 10) {
            sec = `0${sec}`;
          }
          this.mvList[i].duration = `${min}:${sec}`;
        }
      }
    },
    showPopup() {
      this.show = true;
    },
    changeItem(data) {
      this.area = data.text;
    },
    changeItem1(data) {
      this.type = data.text;
    },
    changeItem2(data) {
      this.order = data.text;
    },
    changePage() {
      this.getmvList();
    }
  }
};
</script>

<style scoped>
.mv_List {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}
.mv_list_img {
  height: 150px;
  position: relative;
}
</style>
