import Vue from 'vue'
import VueRouter from 'vue-router'
import BookView from "@/views/BookView";
import store from "@/store";
import axios from 'axios'
import qs from "qs";
import api from "@/utils/api";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'book',
    meta: {
      title: '北航书籍订购系统',
      requireAuth: true
    },
    component: () => import("../views/BookView"),
    redirect: "/login",
    children: [
      { path: 'subscription', name: '订购', component: () => import("../views/Subscription")},
      { path: 'home', name: '主页', component: () => import("../views/Home")},
      { path: 'publish', name: '发布', component: () => import("../views/Publish")},
      { path: "cart", name: '购物车', component: () => import("../views/ShoppingCart")},
      { path: "record", name: '交易记录', component: () => import("../views/Record")},
      { path: "confirmOrder", name: '交易', component: () => import("../views/ConfirmOrder")},

      {
        path: 'pinfo',
        name: '个人信息',
        component: () => import('../views/User'),
        meta: {
          title: '个人信息'
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register'),
    meta: {
      title: '注册'
    }
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
    (to, from, next) => {
      localStorage.setItem("currentPathName", to.name)
      store.commit("setPath")
      console.log("guard me")
      if (to.matched.some(ele => ele.meta.requireAuth)) {
        let token = localStorage.getItem("token")
        const postdata = qs.stringify({
          token: token,
        })
        axios({
          url: api.glbhttp + "/auth/select-token",
          method: "POST",
          data: postdata
        }).then(function (response) {
          console.log(response.data)
          if (response.data.find) {
            console.log("pass that")
            next()
          } else {
            console.log("resist")
            next({

              path: '/login'
            })
          }
        }).catch(function (e) {
          console.log(e)
        })
      } else {
        next()
      }
    }
)

export default router
