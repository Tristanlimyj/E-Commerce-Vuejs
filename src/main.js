// Bootstrap import
import {
  BootstrapVue,
  IconsPlugin,
  CarouselPlugin,
  VBScrollspyPlugin,
  LayoutPlugin,
  JumbotronPlugin,
  NavbarPlugin
} from "bootstrap-vue";
// Bootstrap Dependencies
import PortalVue from "portal-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Font Awesome Icons
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGlassCheers,
  faMapMarkerAlt,
  faTimes,
  faEnvelope,
  faMobileAlt,
  faCouch,
  faTruck,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
// Vee-Validate
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { alpha, required, email, is, digits } from "vee-validate/dist/rules";

// Vue Cookies
import VueCookies from "vue-cookies";

// Vue Imports
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Creating Mirage Server
import { makeServer } from "./server.js";
makeServer();

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
Vue.$cookies.config("20min", "/", "localhost", true, "Lax");
// Font Awesome
library.add(
  faGlassCheers,
  faMapMarkerAlt,
  faTimes,
  faCheckCircle,
  faTimesCircle,
  faEnvelope,
  faMobileAlt,
  faInstagram,
  faCouch,
  faTruck,
  faClock
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
dom.watch();

// Vee-Validate
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("postal", {
  message: "Invalid postal code",
  validate: value => {
    const cleanInput = value.trim();
    const postalNoS = new RegExp(/^s\d{6}$/i);
    const postalNum = new RegExp(/^\d{6}$/i);
    if (postalNoS.test(cleanInput) || postalNum.test(cleanInput)) {
      return true;
    }
    return false;
  }
});
extend("handphoneNumber", {
  message: "Invalid handphone number",
  validate: value => {
    if (Number.isInteger(parseInt(value, 10)) && value.toString().length <= 8) {
      return true;
    }
    return false;
  }
});
extend("alpha", {
  ...alpha,
  message: "The input that you have written is invalid"
});
extend("digits", {
  ...digits,
  message: "Please input a valid number"
});
extend("email", {
  ...email,
  message: "Please input a valid email"
});
extend("required", {
  ...required,
  message: "This field is required"
});
extend("is", {
  ...is,
  message: "Please accept the Terms and Conditions"
});
extend("passwordConfirmation", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match"
});

new Vue({
  components: {
    ValidationProvider,
    ValidationObserver,
    FontAwesomeIcon
  },
  router,
  render: h => h(App)
}).$mount("#app");
