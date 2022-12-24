import Vue from "vue";
import VueX from "vuex"
import shoppingCart from './modules/shoppingCart'
Vue.use(VueX)

const store = new VueX.Store({
    state: {
        currentPathName: ''
    },
    modules: {
        shoppingCart
    },
    mutations: {
        setPath(state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        }
    }
})

export default store