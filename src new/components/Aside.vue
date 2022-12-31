<template>
  <el-menu :default-openeds="['1', '3']"
           style="height: 100%; overflow-x: hidden; box-shadow: 2px 2px 5px #888888;"
           background-color="#03254A"
           active-text-color="#FFD700"
           text-color="#ffffff"
           :collapse-transition="false"
           :collapse="isCollapsed"
           router
  >
    <div style="line-height: 60px; text-align: center">

            <span><img src="../assets/logo.png"
                       style="width: 35px; margin-bottom: 0; position: relative; top: 5px; margin-right: 3px"></span>
      <span><b v-if="!isCollapsed" style="color: white">教材订阅系统</b></span>
    </div>

    <el-menu-item index="/home">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-management"></i>
        <span slot="title">书籍</span>
      </template>
      <el-menu-item-group style="margin-top: -12px">
        <el-menu-item index="/subscription"><i class="el-icon-s-claim"></i>订购</el-menu-item>
        <el-menu-item index="/publish"><i class="el-icon-s-promotion"></i>发布</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i><span slot="title">信息</span></template>
      <el-menu-item-group style="margin-top: -12px">
        <el-menu-item index="/cart"><i class="el-icon-shopping-cart-1"></i>购物车</el-menu-item>
        <el-menu-item index="/record"><i class="el-icon-postcard"></i>交易记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>


  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapsed: Boolean,

  }
}
</script>

<style scoped>

</style>