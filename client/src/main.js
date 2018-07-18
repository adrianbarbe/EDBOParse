import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './styles/main.styl';
import axios from 'axios';
import VueAxios from 'vue-axios';

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:9000');

Vue.use(VueAxios, axios);
Vue.use(Vuetify);

Vue.axios.defaults.baseURL = "http://localhost:9000/api";
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
