<template>
<div style=" font-size: 12px;  display: flex ;line-height: 60px;padding-left: 1vh; padding-right: 4vh">
    <div style="flex: 1; font-size: 20px">

      <span :class="collapseBtnClass" style="cursor: pointer; margin-left: -15px; margin-right: 20px; font-size: 18px" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px ">
        <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
        <!--              <el-breadcrumb-item><a href="/">管理</a></el-breadcrumb-item>-->
        <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-image src="https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
              style="border-radius: 20px; height:40px; width: 40px; margin-top: 10px; margin-left: 5px; margin-right: 5px"></el-image>
    <span style="font-size: 16px">{{nick}}</span>
    <el-dropdown style="width: 3vh; margin-left: 5px">
      <i class="el-icon-arrow-down" style="width: 10px; cursor: pointer"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="font-size: 14px">个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout" style="font-size: 14px" >注销登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Function
  },
  methods: {
    logout() {
      console.log("logout")
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = this.$Api.glbhttp + "/auth/logout";
        // console.log(this.pageNum, this.pageSize)
        let data1 = {
          username: localStorage.getItem("username")
        };
        console.log(data1)
        axios.post(url, qs.stringify(data1), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {

          console.log(res)


        })

        this.$message({
          type: 'success',
          message: '登出成功!'
        });
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
  },
  watch: {
    // '$route': function () {
    //   this.currentPathName = localStorage.getItem("currentPathName")
    // }
    currentPathName (newVal, oldVal) {
      console.log(newVal)
    }
  },
  data() {
    return {
      // currentPathName: localStorage.getItem("currentPathName")
      nick: ""
    }
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;
    }
  },
  created() {
    this.nick = localStorage.getItem("username")
  }

}
</script>

<style scoped>

</style>