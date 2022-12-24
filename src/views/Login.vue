<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!-- 左边介绍 -->
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到 BUAA 书籍交易平台</h2>
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
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>

          <v-text-field
          style="font-size: 12px; margin-right: 4px" @click="handlePhoneLogin">
            手机号登录
          </v-text-field>

          <el-button type="primary" @click="handleSubmit"
          >登录</el-button
          >
          <el-button @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        }],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }]
      },
    };
  },
  methods: {
    handleSubmit() {
      let token = ''
      for (let i = 1; i <= 32; i++) {
        const n = Math.floor(Math.random() * 16.0).toString(16)
        token += n
      }
      const postdata = qs.stringify({
        username: this.loginForm.username,
        password: this.loginForm.password,
        token: token,
      })
      if (this.loginForm.username !== "" && this.loginForm.password !== "") {
        this.$axios({
          url: this.$Api.glbhttp + "/auth/username-login",
          method: "POST",
          data: postdata,
        }).then(function (response) {
          if (response.data.success) {
            window.alert("登录成功")
            localStorage.setItem("username", this.loginForm.username)
            localStorage.setItem("token", token)
            setTimeout(() => {
              const postdata = qs.stringify({
                username: localStorage.getItem("username"),
              })
              this.$axios({
                url: this.$Api.glbhttp +"/auth/logout",
                method: "POST",
                data: postdata
              })
              localStorage.removeItem("username")
              localStorage.removeItem("token")
            }, 600000) // 10min后自动清除token
            console.log("try to loging")
            this.$router.push('/home')
          } else {
            window.alert("密码错误")
            this.loginForm.username = ""
            this.loginForm.password = ""
          }
        }.bind(this)).catch(function (e) {
          console.log(e)
        })
      } else {
        window.alert("用户名或密码为空")
        this.loginForm.username = ""
        this.loginForm.password = ""
      }
    },

    handleRegister() {
      this.$router.push('/register')
    },

    handlePhoneLogin() {
      this.$router.push('/phoneLogin')
    }

  },

};
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
