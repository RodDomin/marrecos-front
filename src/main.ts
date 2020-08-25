import Vue from 'vue';
import VueToast from 'vue-toast-notification';

// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueToast as any, {
  position: 'top-left',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
