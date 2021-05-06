import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Store from "@/state/store";
import Router from "./router";
import { App } from "./App";
import VueRouter from 'vue-router'

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Store()
const router = new Router(store)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
