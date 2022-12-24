import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/global.css"
import request from "@/utils/request";

import store from "@/store";
import qs from "qs";
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI, {size: "small"})

Vue.prototype.request=request
//配置全局api
import api from './utils/api'    //先引入文件
Vue.prototype.$Api=api;   //将引入的文件挂载到vue的原型中
new Vue({
  router,

  store,

  render: h => h(App)
}).$mount('#app')
