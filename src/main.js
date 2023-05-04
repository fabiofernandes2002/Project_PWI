import Vue, { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Import BootstrapVue and its default styles
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import Swal from 'sweetalert';

Vue.prototype.$swal = Swal;

import VueMask from 'v-mask';
Vue.use(VueMask);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
