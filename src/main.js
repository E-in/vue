import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/global.css'
Vue.use(ElementUI, { locale,size: "small"})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});