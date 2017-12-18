import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import App from './App'

import RouterConfig from './router.config.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Router)
Vue.use(ElementUI)
//axios这个插件不支持use引入
Vue.prototype.$ajax = axios

const router = new Router(RouterConfig);
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }else{
    document.title = '当前地址有误';
  };
  next();
})

new Vue({
  el: '#app',
  router,
  render (createElement) {
    return createElement(App)
  }
})
