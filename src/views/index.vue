<template>
  <div>
    <div class="content">
      <!-- 排行榜 -->
      <div class="content_1">
        <!-- 单个排行盒子 -->
        <div class="content_1_1" v-for="(item, index) in rankingList.data" :key="index">
          <!-- 时间 -->
          <div class="content_1_1_1">{{ rankingList.time[index] }}</div>
          <!-- 前三名盒子 -->
          <div class="content_1_1_2">
            <!-- 第二名盒子 -->
            <div class="content_1_1_2_1" style="padding-top: 0.3rem">
              <!-- 第二名头像盒子 -->
              <div class="content_1_1_2_1_1" :style="`background-image:url(${require('../img/2.png')})`">
                <!-- 第二名头像 -->
                <img :src="item[1].py" class="content_1_1_2_1_1_1" />
              </div>
              <!-- 第二名名字 -->
              <div class="content_1_1_2_1_2">{{ item[1].name }}</div>
            </div>
            <!-- 第一名盒子 -->
            <div class="content_1_1_2_1" style="padding-top: 0.075rem">
              <!-- 第一名头像盒子 -->
              <div class="content_1_1_2_1_1" :style="`background-image:url(${require('../img/1.png')})`">
                <!-- 第一名头像 -->
                <img :src="item[0].py" class="content_1_1_2_1_1_1" />
              </div>
              <!-- 第一名名字 -->
              <div class="content_1_1_2_1_2">{{ item[0].name }}</div>
            </div>
            <!-- 第三名盒子 -->
            <div class="content_1_1_2_1" style="padding-top: 0.3rem">
              <!-- 第三名头像盒子 -->
              <div class="content_1_1_2_1_1" :style="`background-image:url(${require('../img/3.png')})`">
                <!-- 第三名头像 -->
                <img :src="item[2].py" class="content_1_1_2_1_1_1" />
              </div>
              <!-- 第三名名字 -->
              <div class="content_1_1_2_1_2">{{ item[2].name }}</div>
            </div>
          </div>
          <!-- 详细列表 -->
          <div class="content_1_1_3">
            <!-- 列表单个 -->
            <div class="content_1_1_3_1" :style="index2 % 2 == 0 ? 'background: #6B39D8;' : 'background: #5D2FC3;'" v-for="(item2, index2) in item" :key="index2">
              <!-- 左侧 -->
              <div class="content_1_1_3_1_1">
                <!-- 标识 -->
                <div class="content_1_1_3_1_1_1">{{ index2 + 1 }}</div>
                <!-- 姓名 -->
                <div class="content_1_1_3_1_1_2">{{ item2.name }}</div>
              </div>
              <!-- 业绩 -->
              <div class="content_1_1_3_1_2">{{ item2.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 倒计时 -->
      <div class="content_2">本月剩余时间倒计时：{{ time }}天</div>
    </div>
  </div>
</template>

<script>
import { getRankingList } from '../utils/api';
import { pinyin } from 'pinyin-pro';
export default {
  data() {
    return {
      // 时间数组
      timeArray: [],
      // 排行榜数据
      rankingList: { time: [], data: [] },
      // 剩余时间
      time: 0,
    };
  },
  methods: {
    // 获取排行榜数据
    getRankingList() {
      // 获取四天
      const timeArray = [];
      for (let i = 0; i < 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        timeArray.push(`${year}年${month}月${day}日排名`);
      }
      this.rankingList.time = timeArray;
      getRankingList().then(res => {
        res.data.today.forEach(todayItem => {
          this.$set(todayItem, 'py', pinyin(todayItem.name, { pattern: 'initial' }));
          todayItem.py = require(`../img/${todayItem.py.replace(/\s+/g, '')}.jpg`);
        });
        res.data.yesterday.forEach(todayItem => {
          this.$set(todayItem, 'py', pinyin(todayItem.name, { pattern: 'initial' }));
          todayItem.py = require(`../img/${todayItem.py.replace(/\s+/g, '')}.jpg`);
        });
        res.data['-2 day'].forEach(todayItem => {
          this.$set(todayItem, 'py', pinyin(todayItem.name, { pattern: 'initial' }));
          todayItem.py = require(`../img/${todayItem.py.replace(/\s+/g, '')}.jpg`);
        });
        res.data['-3 day'].forEach(todayItem => {
          this.$set(todayItem, 'py', pinyin(todayItem.name, { pattern: 'initial' }));
          todayItem.py = require(`../img/${todayItem.py.replace(/\s+/g, '')}.jpg`);
        });
        this.rankingList.data = [];
        this.rankingList.data.push(res.data.today);
        this.rankingList.data.push(res.data.yesterday);
        this.rankingList.data.push(res.data['-2 day']);
        this.rankingList.data.push(res.data['-3 day']);
      });
    },
    // 月底倒计时
    countDown() {
      // 每1小时执行一次距离月底还多少天
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const time = new Date(`${year}/${month + 1}/1 00:00:00`).getTime() - new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`).getTime();
      this.time = Math.ceil(time / 1000 / 60 / 60 / 24);
    },
  },
  mounted() {
    // 获取排行榜数据
    this.getRankingList();
    // 月底倒计时
    this.countDown();
    setInterval(() => {
      // 获取排行榜数据
      this.getRankingList();
      // 月底倒计时
      this.countDown();
    }, 360000);
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
