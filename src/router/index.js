import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Routes Public
import Home from '../views/public/Home.vue';
import IndvPro from '../views/public/IndvPro.vue';

// Admin Routes
import Admin from '../views/admin/Admin.vue';
import AddProduct from '../views/admin/AddProduct.vue';
import EditProduct from '../views/admin/EditProduct.vue';
import Feedback from '../views/admin/Feedback.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Login from '../views/admin/Login.vue';
import Registration from '../views/admin/Registration.vue';
import Orders from '../views/admin/Orders.vue';
import Cart from '../views/admin/Cart.vue';
import Inventory from '../views/admin/Inventory.vue';

// Components
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
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
        path: 'registration',
        name: 'registration',
        component: Registration,
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
        path: 'feedback',
        name: 'Feedback',
        component: Feedback,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: Inventory,
      },
      {
        path: '/product/:name',
        name: '',
        component: IndvPro,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
