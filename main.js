import Vue from 'vue'
import App from './App'
import store from '@/store'
import axios from 'axios'
// import Router, {RouterMount} from 'uni-simple-router';
// Vue.use(Router)

import "@/common/axios-adapter.js"
// import http from '@/common/http.js' // 全局挂载引入，配置相关在该index.js文件里修改
// Vue.prototype.$http = http
// import {POST} from '@/common/http.js' // 全局挂载引入，配置相关在该index.js文件里修改
// Vue.prototype.$post = POST
// import {GET} from '@/common/http.js' // 全局挂载引入，配置相关在该index.js文件里修改
// Vue.prototype.$get = GET

import log from '@/common/log.js'
Vue.prototype.$log = log


import uView from "uview-ui";
Vue.use(uView);

import api from '@/common/api.js';
Vue.prototype.$api = api;

Vue.prototype.$store = store;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
