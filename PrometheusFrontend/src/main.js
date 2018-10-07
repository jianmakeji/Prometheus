// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import cookie from './public/util'

Vue.use(iView)


router.beforeEach((to, from, next) => {
  console.log('路由拦截') //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    let token = cookie.getCookie('token');
    if (token) {
      next();
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next();
    //如果无需token,那么随它去吧
  }
})
// http request 拦截器
axios.interceptors.request.use(config => {
  let token = cookie.getCookie('token');
  console.log(token)
  if (token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.authorization = `token ${token}`;
  }
  return config;
}, err => {
  return Promise.reject(err);
});
// http response 拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        router.replace({
          path: '/login'
        });
    }
  }
  return Promise.reject(error.response.data);
  // 返回接口返回的错误信息
});


// axios.defaults.crossDomain = false;
// axios.defaults.withCredentials  = true;
//
Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
