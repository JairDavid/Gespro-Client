import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./notifications/Notify";

Vue.config.productionTip = false;

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
