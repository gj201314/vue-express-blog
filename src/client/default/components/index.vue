<template>
  <div class="content">
    <el-carousel :interval="5000" arrow="always" id="banner">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <h3 class="section-title">推荐</h3>
    <div class="card-list clearfix">
      <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in 9" :key="o" class="card-box clearfix">
        <img src="/static/img/hamburger.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <div class="time">{{ currentDate }}</div>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <h3 class="section-title">最新</h3>
    <div class="card-list clearfix">
      <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in 9" :key="o" class="card-box clearfix">
        <img src="/static/img/hamburger.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <div class="time">{{ currentDate }}</div>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: '2017/10/10 16:39'
    };
  }
}
</script>
<style scoped>
.section-title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
#banner {
  margin-top: 10px;
}
.card-list .card-box {
  width: 280px;
  float: left;
  margin-right: 24px;
  margin-bottom: 10px;
}
.card-list .card-box:nth-child(4n) {
  margin-right: 0;
}
.card-list .time {
  font-size: 13px;
  color: #999;
}

.card-list .bottom {
  margin-top: 13px;
  line-height: 12px;
}

.card-list .button {
  padding: 0;
  float: right;
}

.card-list .image {
  width: 100%;
  display: block;
}
</style>
