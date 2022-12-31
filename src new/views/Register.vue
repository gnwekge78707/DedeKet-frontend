<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!-- 左边介绍 -->
    <el-col :xl="6" :lg="7">
      <h2>注册</h2>
      <el-image
          :src="require('@/assets/logo.png')"
          style="heigth: 180px; with: 180px"
      ></el-image>
    </el-col>

    <!-- 中间分割线 -->
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center"/>
    </el-col>

    <!-- 右侧表单 -->
    <el-col :xl="6" :lg="7">
      <el-form
          :model="registerForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" style="width: 380px">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password" style="width: 380px">
          <el-input v-model="registerForm.password2" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleRegister"
          >注册</el-button
          >
          <el-button @click="handleReturn">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import qs from 'qs'

export default {
  name: "Register",
  data () {
    return {
      registerForm: {
        username: "",
        phone: "",
        password: "",
        password2: "",
      },
      rules: {
        username: [{
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        }],
        phone: [{
          message: "请输入手机号",
          trigger: "blur",
        }],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }],
        password2: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }]
      },
    }
  },
  components: {
  },
  methods: {
    handleRegister() {
      const postdata = qs.stringify({
        username: this.registerForm.username,
        phone: this.registerForm.phone,
        password: this.registerForm.password,
      })
      if (this.registerForm.password === this.registerForm.password2 && this.registerForm.username !== "" && this.registerForm.password !== "") {
        this.$axios({
          url: this.$Api.glbhttp +"/auth/register",
          method: "POST",
          data: postdata
        }).then(function (response) {
          if (response.data.usernameDuplicate) {
            window.alert("该用户名已被占用")
            this.registerForm.username = ""
            this.registerForm.phone = ""
            this.registerForm.password = ""
            this.registerForm.password2 = ""
           } else if (response.data.phoneDuplicate) {
            window.alert("手机号已被注册")
            this.registerForm.username = ""
            this.registerForm.phone = ""
            this.registerForm.password = ""
            this.registerForm.password2 = ""
          } else {
            window.alert("注册成功")
            this.$router.push('/login')
          }
        }.bind(this)).catch(function (e) {
          console.log(e)
        })
      } else {
        if (this.registerForm.username !== "" && this.registerForm.password !== "") {
          window.alert("两次密码填写不一致")
        } else {
          window.alert("用户名或密码为空")
        }
        this.registerForm.username = ""
        this.registerForm.phone = ""
        this.registerForm.password = ""
        this.registerForm.password2 = ""
      }
    },
    handleReturn() {
      this.registerForm.username = ""
      this.registerForm.phone = ""
      this.registerForm.password = ""
      this.registerForm.password2 = ""
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.el-row {
  display: flex;
  background-color: #fafafa;
  /* 整体居中 */
  height: 100vh;
  align-items: center;
  /* 图片居中 */
  text-align: center;
}
.el-divider {
  width: 1px;
  height: 200px;
}
</style>

