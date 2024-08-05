import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/global.css'
Vue.use(ElementUI, { locale,size: "small"})
function setMinDimensions() {
  document.documentElement.style.minWidth = '1400px';  // 设置最小宽度
  document.documentElement.style.minHeight = '600px'; // 设置最小高度
}
setMinDimensions();
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});