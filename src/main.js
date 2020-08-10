// Bootstrap import
import {
  BootstrapVue, IconsPlugin, CarouselPlugin,
  VBScrollspyPlugin, LayoutPlugin, JumbotronPlugin,
  NavbarPlugin,
} from 'bootstrap-vue';
// Bootstrap Dependencies
import PortalVue from 'portal-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Font Awesome Icons
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faGlassCheers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// Vee-Validate
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import {
  alpha, required, email, is, digits,
} from 'vee-validate/dist/rules';
// Axios Import
import axios from 'axios';
// Vue Cookies
import VueCookies from 'vue-cookies';
// Vue Imports
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// Vuex Import
import store from './store';

// Axios Defaults
axios.defaults.baseURL = 'api.thealchemistalcohol.com';
// Cookies
// Initialise in the app
// BootStrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);
Vue.use(VBScrollspyPlugin);
Vue.use(CarouselPlugin);
Vue.use(JumbotronPlugin);
Vue.use(NavbarPlugin);
Vue.use(PortalVue);

// Vue Cookies
Vue.use(VueCookies);

// Font Awesome
library.add(faGlassCheers, faMapMarkerAlt);
library.add(faTelegram);
Vue.component('font-awesome-icon', FontAwesomeIcon);
dom.watch();

// Vee-Validate
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
extend('alpha', {
  ...alpha,
  message: 'Please input a Alpha numeric input',
});
extend('digits', {
  ...digits,
  message: 'Please input a number',
});
extend('email', {
  ...email,
  message: 'Please input a valid email',
});
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('is', {
  ...is,
  message: 'Please accept the Terms and Conditions',
});
extend('passwordConfirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match',
});

Vue.config.productionTip = false;

new Vue({
  components: {
    ValidationProvider,
    ValidationObserver,
    FontAwesomeIcon,
  },
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
