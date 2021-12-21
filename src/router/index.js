import Vue from "vue";
import VueRouter from "vue-router";

// Components
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/Something/Public.vue"),

    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("../views/Cart.vue")
      },
      {
        path: "/products",
        name: "products",
        component: () => import("../views/Products.vue")
      },
      {
        path: "/add-on",
        name: "AddOnPublic",
        component: () => import("../views/AddOn.vue")
      },
      {
        path: "/products/:name",
        name: "IndvPro",
        component: () => import("../views/IndvPro.vue")
      },
      {
        path: "/add-on/:name",
        name: "IndvAddOn",
        component: () => import("../views/IndvAddOn.vue")
      },
      {
        path: "/checkout",
        name: "Checkout",
        component: () => import("../views/Checkout.vue")
      },
      {
        path: "/payment/success/:orderId",
        name: "PaymentSuccess",
        component: () => import("../views/PaymentSuccess.vue")
      },
      {
        path: "/payment/error",
        name: "PaymentError",
        component: () => import("../views/PaymentError.vue")
      }
    ]
  },
  {
    path: "/link-directory",
    name: "LinkDirectory",
    component: () => import("../views/LinkDirectory.vue")
  },
  {
    path: "*",
    name: "ErrorPage",
    component: () => import("../views/ErrorPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
