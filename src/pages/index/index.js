// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './index.vue';
import router from './router';
import '@/assets/css/common.css';
import '@/mock';

/* 定义不同入口，跳转路径配置 index.js*/
if (location.hostname === 'localhost') {
  Vue.prototype.HTTPLOCAT = '';
} else {
  const http = window.location.protocol + '//' + location.hostname + ':' + location.port;
  Vue.prototype.HTTPLOCAT = http + '/netopenws/wt/vue/dist'; // （这个路径改为你服务器的路径）
}
// 页面跳转
// window.location.href = this.HTTPLOCAT + '/test.html'

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});


