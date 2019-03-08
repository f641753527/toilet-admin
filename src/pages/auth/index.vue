<template>
  <div class="auth">
    <div class="header">
      马桶后台管理系统
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

<style lang="scss" scoped>
.auth{
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
