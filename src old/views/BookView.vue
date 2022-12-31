<template>
  <div class="home" style="height: 100%">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246);height: 100%; overflow: auto; ">
        <Aside :is-collapsed="isCollapsed"></Aside>
      </el-aside>

      <el-container>

        <el-header
            style="border-bottom: 1.5px solid #ccc ;">
          <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse"></Header>

        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import request from "@/utils/request";
import mydialog from "@/components/searchBar";
import ArticleComment from "@/components/comment";
import Aside from "@/components/Aside"
import Header from "@/components/Header"
import axios from "axios";
export default {
  name: 'HomeView',
  components: {ArticleComment, mydialog, Aside, Header},
  data() {
    const item = {
      id: 114,
      bookname: "《概率论》",

      url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgx.xiawu.com%2Fxzimg%2Fi4%2Fi4%2F12402024394202568%2FT177wkXXNcXXXXXXXX_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimgx.xiawu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665326133&t=9af98cf2aaa0cfa0dc60d7c04bb2b950",
      srclist: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],

      seller: "教务处",
      remain: "100",
      total: "200",
      rating: "3.7",
      lecture: "概率论与数理统计",
      comments: [],

    }
    return {


      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      isCollapsed: false,
    }
  },
  created() {

  },
  methods: {

    collapse() {
      this.isCollapsed = !this.isCollapsed
      if (this.isCollapsed) {
        this.sideWidth = 70;
        this.collapseBtnClass = 'el-icon-s-unfold';
      } else {
        this.sideWidth = 200;
        this.collapseBtnClass = 'el-icon-s-fold';
      }

      console.log(this.isCollapsed)
    },
    // delBatch(){
    //   this.delIds = this.multiSelection.map(v => v.id)
    //   request.post("http://localhost:9090/user/del/batch").then()
    // }
  }
}
</script>
