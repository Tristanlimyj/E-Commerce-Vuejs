import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Routes Public
import Public from '../views/public/Public.vue';
import Home from '../views/public/Home.vue';
import Products from '../views/public/Products.vue';
import AddOnPublic from '../views/public/AddOnPublic.vue';
import IndvPro from '../views/public/IndvPro.vue';
import IndvAddOn from '../views/public/IndvAddOn.vue';
import Cart from '../views/public/Cart.vue';
import Checkout from '../views/public/Checkout.vue';
import PaymentSuccess from '../views/public/PaymentSuccess.vue';
import PaymentError from '../views/public/PaymentError.vue';
import ContactPage from '../views/public/ContactPage.vue';
import LinkDirectory from '../views/public/LinkDirectory.vue';
import TermsofService from '../views/public/TermsofService.vue';
import PrivacyPolicy from '../views/public/PrivacyPolicy.vue';
import ErrorPage from '../views/public/ErrorPage.vue';

// Admin Routes
import Admin from '../views/admin/Admin.vue';
import AddProduct from '../views/admin/AddProduct.vue';
import EditProduct from '../views/admin/EditProduct.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Login from '../views/admin/Login.vue';
import Mixer from '../views/admin/Mixer.vue';
import AddOnPrivate from '../views/admin/AddOn.vue';
import EditAddOn from '../views/admin/EditAddOn.vue';
import PromoCode from '../views/admin/PromoCode.vue';
import DeliveryOptions from '../views/admin/DeliveryOptions.vue';
import UpdateDeliveryOption from '../views/admin/UpdateDeliveryOption.vue';
import AdminLinkDirectory from '../views/admin/LinkDirectory.vue';

// Components
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Public,

    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: '/products',
        name: 'products',
        component: Products,
      },
      {
        path: '/add-on',
        name: 'AddOnPublic',
        component: AddOnPublic,
      },
      {
        path: '/products/:name',
        name: 'IndvPro',
        component: IndvPro,
      },
      {
        path: '/add-on/:name',
        name: 'IndvAddOn',
        component: IndvAddOn,
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
      },
      {
        path: '/payment/success/:orderId',
        name: 'PaymentSuccess',
        component: PaymentSuccess,
      },
      {
        path: '/payment/error',
        name: 'PaymentError',
        component: PaymentError,
      },
    ],
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
  },
  {
    path: '/terms-of-service',
    name: 'TermsofService',
    component: TermsofService,
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/link-directory',
    name: 'LinkDirectory',
    component: LinkDirectory,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      // Check if user has logged in
      if (Vue.$cookies.isKey('token')) {
        const token = Vue.$cookies.get('token');
        store.dispatch('decodeToken', token);
        next();
      } else next({ path: '/' });
    },

    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'add-product',
        name: 'AddProduct',
        component: AddProduct,
      },
      {
        path: 'product/edit/:name',
        name: 'ProductEdit',
        component: EditProduct,
      },
      {
        path: 'mixer',
        name: 'Mixer',
        component: Mixer,
      },
      {
        path: 'addon',
        name: 'AddOnPrivate',
        component: AddOnPrivate,
      },
      {
        path: 'addon/edit/:name',
        name: 'EditAddOn',
        component: EditAddOn,
      },
      {
        path: 'promo-code',
        name: 'PromoCode',
        component: PromoCode,
      },
      {
        path: 'delivery-options',
        name: 'DeliveryOptions',
        component: DeliveryOptions,
      },
      {
        path: 'delivery-options/update/:publicId',
        name: 'UpdateDeliveryOption',
        component: UpdateDeliveryOption,
      },
      {
        path: 'link-directory',
        name: 'AdminLinkDirectory',
        component: AdminLinkDirectory,
      },
    ],
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
