<template>
  <div class="navigator">
    <div class="header">
      <!-- 马桶后台管理系统 -->
      <el-menu :default-active="active_path" class="el-menu-demo" mode="horizontal" background-color='#333333' text-color='#fff' active-text-color='#fff' @select='menu_change'>
        <el-menu-item index="/navigator/home">首页</el-menu-item>
        <el-menu-item index="/navigator/news/1">互联网</el-menu-item>
        <el-menu-item index="/navigator/news/2">笑料</el-menu-item>
        <el-menu-item index="/navigator/news/3">管理</el-menu-item>
        <el-menu-item index="/navigator/news/4">散文</el-menu-item>
        <el-menu-item index="/navigator/news/5">推荐专题</el-menu-item>
        <el-menu-item index="/navigator/news/6">热门推荐</el-menu-item>
        <el-menu-item index="/navigator/news/7">清新一刻</el-menu-item>
      </el-menu>
    </div>
    <div class="body">
      <router-view/>
    </div>
    <div class="footer">
      <p class="line">Copyright ©2019 范范童鞋</p>
      <p class="line">深圳市澳考科技有限公司</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active_path: '/navigator/home'
    };
  },
  methods: {
    menu_change(i, path) {
      this.active_path = i;
      this.$router.push(i);
    },
  },
};
</script>


<style lang="scss" scoped>
.navigator{
  .header{
    padding-left: 120px;
    height: 60px;
    background: #333333;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 60px;
  }
  .body{
    min-height: calc(100vh - 140px);
  }
  .footer{
    height: 80px;
    background: #333333;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
