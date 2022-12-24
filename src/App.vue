<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userToken: "",
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("token")) {
      // 如果已经登录，设置vuex登录状态
      this.userToken = localStorage.getItem("token");
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    }
  },
  computed: {
    ...mapGetters(["getNum"])
  },
  watch: {
    // 获取vuex的登录状态
    userToken(val, oldVal){
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
            .post(this.$Api.glbhttp + "/deal/get-trolley-textbook", {
              token: val
            })
            .then(res => {
              if (res.data.status === true) {
                // 001 为成功, 更新vuex购物车状态
                this.setShoppingCart(res.data.data);
              } else {
                // 提示失败信息
                this.notifyError(res.data.msg);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
      }
    }
  },
  methods: {
    ...mapActions(["setShoppingCart"]),
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>