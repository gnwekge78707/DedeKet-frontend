<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info" >
        <div
            tabindex="0"
            contenteditable="true"
            id="replyInput"
            spellcheck="false"
            placeholder="输入评论..."
            class="reply-input"
            @focus="showReplyBtn"
            @input="onDivInput($event)"
        >
        </div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
      </div>
    </div>
    <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
      <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{item.Sender}}</span>
        <span class="author-time">{{item.CreatedAt}}</span>
      </div>
      <div class="icon-btn">
        <span @click="showReplyInput(i,item.Sender,item.Sender)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
        <i class="iconfont el-icon-caret-top"></i>{{item.like}}
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{item.Comment}}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
          <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
          <div class="author-info">
            <span class="author-name">{{reply.from}}</span>
            <span class="author-time">{{reply.CreatedAt}}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
            <i class="iconfont el-icon-caret-top"></i>{{reply.like}}
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{reply.to}}:</span>
              <span class="reply">{{reply.comment}}</span>
            </p>
          </div>
          <div class="reply-box">

          </div>
        </div>
      </div>
      <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info" >
          <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
        </div>
        <div class=" reply-btn-box">
          <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">发表评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import qs from "qs";

function deepClone(obj) {
  var _obj = JSON.stringify(obj) //  对象转成字符串
  var objClone = JSON.parse(_obj) //  字符串转成对象
  return objClone
}
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name:'ArticleComment',
  props: {
    comment1: Array,
    textbookid1: String

  },
  watch: {
    comment1 (newV, oldV) {
      // console.log("got it !!")
      // console.log("new", newV)
      // console.log("old", oldV)
      this.comments = newV
    },

    textbookid1 (newV, oldV) {
      console.log("got DDDDDD !!")
      console.log("new", newV)
      console.log("old", oldV)
      this.textbookId = newV
    }
  },

  data(){
    return{
      textbookId: 0,
      btnShow: false,
      index:'0',
      replyComment:'',
      myName: localStorage.getItem("username"),
      myHeader:'https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      myId: this.myName,
      to:'',
      toId:-1,
      comments: []
    }
  },
  directives: {clickoutside},
  methods: {
    uuid() {
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4';
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = '-';

      this.uuidA = s.join('');
      console.log(s.join(''), 's.join("")');
      return this.uuidA;
    },
    inputFocus(){
      var replyInput = document.getElementById('replyInput');
      replyInput.style.padding= "8px 8px"
      replyInput.style.border ="2px solid blue"
      replyInput.focus()
    },
    showReplyBtn(){
      this.btnShow = true
    },
    hideReplyBtn(){
      this.btnShow = false
      replyInput.style.padding= "10px"
      replyInput.style.border ="none"
    },
    showReplyInput(i,name,id){
      this.comments[this.index].inputShow = false
      this.index =i
      this.comments[i].inputShow = true
      this.to = name
      this.toId = id
    },
    _inputShow(i){
      return this.comments[i].inputShow
    },
    sendComment(){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'评论不能为空'
        })
      }else{
        // TextbookId: "1",
        //     Sender: "yufoo1",
        //     Comment: "好书",
        //     CreatedAt: "2022-09-30 10:10:44"
        let a ={}
        let input =  document.getElementById('replyInput')
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        a.Sender= this.myName
        a.Comment =this.replyComment
        a.headImg = this.myHeader
        a.CreatedAt = time
        a.commentNum = 0
        a.like = 0
        this.comments.push(a)


        let url = this.$Api.glbhttp + "/deal/add-comment-to-textbook";

        // console.log(this.pageNum, this.pageSize)
        let data1 = {

          sender: this.myName,
          comment: this.replyComment,
          textbookId: this.textbookId,
        };
        console.log("sending", data1)
        axios.post(url, qs.stringify(data1), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {
          console.log(res)
        })
        this.replyComment = ''
        input.innerHTML = '';
      }
    },
    sendCommentReply(i,j){
      if(!this.replyComment){
        this.$message({
          showClose: true,
          type:'warning',
          message:'评论不能为空'
        })
      }else{
        let a ={}
        let timeNow = new Date().getTime();
        let time= this.dateStr(timeNow);
        a.from= this.myName
        a.to = this.to
        a.fromHeadImg = this.myHeader
        a.Comment =this.replyComment
        a.time = time
        a.commentNum = 0
        a.like = 0
        this.comments[i].reply.push(a)
        this.replyComment = ''
        document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
      }
    },
    onDivInput: function(e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date){
      //获取js 时间戳
      var time=new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time=parseInt((time-date)/1000);
      //存储转换值
      var s;
      if(time<60*10){//十分钟内
        return '刚刚';
      }else if((time<60*60)&&(time>=60*10)){
        //超过十分钟少于1小时
        s = Math.floor(time/60);
        return  s+"分钟前";
      }else if((time<60*60*24)&&(time>=60*60)){
        //超过1小时少于24小时
        s = Math.floor(time/60/60);
        return  s+"小时前";
      }else if((time<60*60*24*30)&&(time>=60*60*24)){
        //超过1天少于30天内
        s = Math.floor(time/60/60/24);
        return s+"天前";
      }else{
        //超过30天ddd
        var date= new Date(parseInt(date));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    }
  },
}
</script>


<style lang="stylus" scoped>
.my-reply
  padding 10px
  background-color #fafbfc
  .header-img
    display inline-block
    vertical-align top
  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width:1200px) {
      width 80%
    }
    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #c4c4c4
      background-color #fff
      border-radius 5px
      &:empty:before
        content attr(placeholder)
      &:focus:before
        content none
      &:focus
        padding 8px 8px
        border 2px solid #02027a
        box-shadow none
        outline none
  .reply-btn-box
    height 25px
    margin 10px 0
    .reply-btn
      position relative
      float right
      margin-right 15px
.my-comment-reply
  margin-left 50px
  .reply-input
    width flex
.author-title:not(:last-child)
  border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
  padding 10px
  .header-img
    display inline-block
    vertical-align top
  .author-info
    display inline-block
    margin-left 5px
    width 60%
    height 40px
    line-height 20px
    >span
      display block
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .author-name
      color #000
      font-size 18px
      font-weight bold
    .author-time
      font-size 14px
  .icon-btn
    width 30%
    padding 0 !important
    float right
    @media screen and (max-width : 1200px){
      width 20%
      padding 7px
    }
    >span
      cursor pointer
    .iconfont
      margin 0 5px
  .talk-box
    margin 0 50px
    >p
      margin 0
    .reply
      font-size 16px
      color #000
  .reply-box
    margin 10px 0 0 50px
    background-color #efefef
</style>