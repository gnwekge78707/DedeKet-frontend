<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center" align="middle" style="flex-flow: row wrap;display: flex;width: 100%">
      <el-col :span="7" style="font-family: 'fangsong'; font-weight: bold; font-size: larger">{{timeWel}}, {{nick}} <br> 欢迎来到北航教材订阅系统</el-col>
      <el-col :span="1">
        <el-divider direction="vertical" content-position="center"/>
      </el-col>
      <el-col :span="12">      <div class="big-box" style="overflow-y:hidden">

        <div class="img-box" style="overflow-y:hidden">
          <div class="show-box" :style="{'transform':'translateX('+translate+'%)','transition':tsion?'all 0.5s':'none'}">
            <img src="src/assets/home/1.jpg" alt="">
            <img v-for='(item,index) in src' :src="item" alt="">
            <img src="src/assets/home/3.jpg" alt="">
          </div>
        </div>
        <div class="arrowhead-box">
          <span @click='last'></span>
          <span @click='next'></span>
        </div>
        <div class="swiper-box" ref="swiper">
          <span v-for='(item,index) in src' @click='swiper(index)'></span>
        </div>

      </div>
      </el-col>
    </el-row>

  </div>


</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      src: [
        require('@/assets/home/7.jpg'),require('@/assets/home/8.jpg'), require('@/assets/home/1.jpg'), require('@/assets/home/6.jpg'),require('@/assets/home/2.jpg'), require('@/assets/home/3.jpg')
      ],
      translateX: 0,
      tsion: true,
      timeWel: "",
      nick:""
    }
  },
  methods: {
    // 上一张
    last() {
      this.translateX--
      this.tsion = true
      if (this.translateX < 0) {
        setTimeout(() => {
          this.tsion = false
          this.translateX = this.src.length - 1
        }, 500)
      }
    },
    // 下一张
    next() {
      this.translateX++
      this.tsion = true

      if (this.translateX > this.src.length - 1) {
        setTimeout(() => {
          this.tsion = false
          this.translateX = 0
        }, 200)
      }
    },
    getTimeState() {

      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        state = `🌞 早上好`;
      } else if (hours > 10 && hours <= 11) {
        state = `🌞 上午好`;
      } else if (hours > 11 && hours <= 13) {
        state = `🌼 中午好`;
      } else if (hours > 13 && hours <= 18) {
        state = `🌼 下午好`;
      } else if (hours > 18 && hours <= 24) {
        state = `😴 晚上好`;
      }
      return state;
    },
    swiper(i){
      this.translateX = i
    }
  },
  mounted() {
    setInterval(()=>{
      this.next()
    },6000)
  },
  created() {
    this.timeWel = this.getTimeState()
    this.nick = localStorage.getItem("username")
    console.log(this.nick)
  },
  computed: {
    translate() {
      return -(this.translateX + 1) * 100
    }
  },
  watch: {
    translateX: {
      handler(val) {
        let a = this.$refs.swiper.querySelectorAll('span')
        a.forEach(element => {
          element.style.width = '12px'
        });

        if (this.translateX < 0) {
          val = this.src.length - 1
        }
        if (this.translateX > this.src.length - 1) {
          val = 0
        }
        a[val].style.width = '100px'
      },
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
}

span {
  margin: 0;
  padding: 0;
}

.big-box {
  overflow: hidden;
  width: 100%;
  height: 70%;
  background-color: #999;
  margin: 100px auto;
  position: relative;
  box-shadow: 0 0 3pc rgba(0, 0, 0, 0.4);
}

.img-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.show-box {

  display: flex;
  height: 100%;
  width: 100%;
  transition: all 0.5s;
}

.show-box img {
  float: left;
  min-width: 100%;
  min-height: 100%;
}


.arrowhead-box {
  position: absolute;
  top: 40%;
  float: left;
  width: 100%;
  height: 50px;
}

.arrowhead-box span {
  float: left;
  display: block;
  width: 6vw;
  height: 6vw;
  border-radius: 5vw;
  background:url('') no-repeat;
  background-color: rgba(0, 0, 0, 0.4);
  background-position: 6px 14px;
  cursor: pointer;
  opacity: 0.5;
}

.arrowhead-box span:nth-child(2) {
  float: right;
  transform:rotate(180deg);
}

.arrowhead-box span:hover {
  opacity: 1;
}

.swiper-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-box span {
  float: left;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.swiper-box span:nth-child(1) {
  width: 100px;
}

</style>