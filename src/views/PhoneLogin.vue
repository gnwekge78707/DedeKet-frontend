<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!-- 左边介绍 -->
    <el-col :xl="6" :lg="7">
      <h2>手机号登录</h2>
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
          :model="phoneLoginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
      >
        <el-form-item label="手机号" prop="username" style="width: 380px">
          <el-input v-model="phoneLoginForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="password" style="width: 380px">
          <el-input v-model="phoneLoginForm.templateParam" type="password"></el-input>
        </el-form-item>

        <el-form-item>

          <v-text-field
              style="font-size: 12px; margin-right: 4px" @click="handleUsernameLogin">
            用户名登录
          </v-text-field>

          <el-button type="primary" @click="handleSubmit"
          >登录</el-button
          >
          <el-button @click="handleSendSms">发送验证码</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";

export default {
  name: "PhoneLogin",
  data() {
    return {
      sendSmsEn: true,
      username: "",
      phoneLoginForm: {
        phone: "",
        templateParam: "",
      },
      rules: {
        username: [{
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        }],
        password: [{
          required: true,
          message: "请输入验证码",
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
        phone: this.phoneLoginForm.phone,
        templateParam: this.phoneLoginForm.templateParam,
        token: token,
      })
      if (this.phoneLoginForm.phone !== "" && this.phoneLoginForm.templateParam !== "") {
        this.$axios({
          url: this.$Api.glbhttp +"/auth/phone-login",
          method: "POST",
          data: postdata,
        }).then(function (response) {
          if (response.data.success) {
            window.alert("登录成功")
            this.username = response.data.username
            localStorage.setItem("username", this.username)
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
            this.$router.push('/home')
          } else {
            window.alert("验证码错误")
            this.loginForm.username = ""
            this.loginForm.password = ""
          }
        }.bind(this)).catch(function (e) {
          console.log(e)
        })
      } else {
        window.alert("用户名或密码为空")
        this.phoneLoginForm.phone = ""
        this.phoneLoginForm.templateParam = ""
      }
    },

    handleSendSms() {
      if (this.phoneLoginForm.phone === "") {
        window.alert("请填写手机号")
        this.phoneLoginForm.phone = ""
        this.phoneLoginForm.templateParam = ""
      } else {
        if (this.sendSmsEn) {
          const postdata = qs.stringify({
            phone: this.phoneLoginForm.phone,
          })
          this.$axios({
            url: this.$Api.glbhttp +"/auth/send-template-param",
            method: "POST",
            data: postdata,
          }).then(function (response) {
            if (response.data.find) {
              window.alert("发送成功")
              this.sendSmsEn = false
              setTimeout(() => {
                this.$axios({
                  url: this.$Api.glbhttp +"/auth/drop-template-param",
                  method: "POST",
                  data: postdata
                })
                this.sendSmsEn = true
              }, 60000)
            } else {
              window.alert("手机号未注册")
              this.phoneLoginForm.phone = ""
              this.phoneLoginForm.templateParam = ""
            }
          }.bind(this))
        } else {
          window.alert("请等待冷却结束")
          this.phoneLoginForm.phone = ""
          this.phoneLoginForm.templateParam = ""
        }
      }

    },

    handleUsernameLogin() {
      this.$router.push('/login')
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
