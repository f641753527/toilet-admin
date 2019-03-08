<template>
  <div class="login">
    <el-row class="login_row">
      <el-col :xs="0" :sm="6" :xl="9">&nbsp;</el-col>
      <el-col :xs="24" :sm="12" :xl="6" class="login_col">
        <el-form label-width="80px" :model="user" :rules="login_rules" ref="loginForm" class="login_form" size='mini'>
          <el-form-item>
            <h2 class="title">登录</h2>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="user.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="0" :sm="6" :xl="9">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from '@/api/request';
import getMD5 from '@/utils/getMD5';
export default {
  data() {
    return {
      user: {
        user_name: '',
        password: ''
      },
      login_rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      Axios.post('/admin/user/login', {
        data: {
          user_name: this.user.user_name,
          password: getMD5(this.user.password)
        }
      }).then(() => {
        this.$router.push('/navigator');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login{
  position: relative;
  height: calc(100vh - 140px);
  background: #f6f6f6;
  .login_row{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .login_form{
      padding: 30px;
      box-sizing: border-box;
      background: #fff;
      .el-form-item:last-of-type{
        margin-bottom: 0;
      }
    }
  }
}
</style>
