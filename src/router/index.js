import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Public.vue'),

    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/add-on',
        name: 'AddOnPublic',
        component: () => import('../views/AddOnPublic.vue'),
      },
      {
        path: '/products/:name',
        name: 'IndvPro',
        component: () => import('../views/IndvPro.vue'),
      },
      {
        path: '/add-on/:name',
        name: 'IndvAddOn',
        component: () => import('../views/IndvAddOn.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue'),
      },
      {
        path: '/payment/success/:orderId',
        name: 'PaymentSuccess',
        component: () => import('../views/PaymentSuccess.vue'),
      },
      {
        path: '/payment/error',
        name: 'PaymentError',
        component: () => import('../views/PaymentError.vue'),
      },
    ],
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: () => import('../views/ContactPage.vue'),
  },
  {
    path: '/terms-of-service',
    name: 'TermsofService',
    component: () => import('../views/TermsofService.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
  },
  {
    path: '/link-directory',
    name: 'LinkDirectory',
    component: () => import('../views/LinkDirectory.vue'),
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('../views/ErrorPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
