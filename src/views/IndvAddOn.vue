<template>
  <div class="indv-pro">
    <addToCart :product="product" liquorOrAddOn="" addToCartUrl="cart/add-to-cart-add-on" />
  </div>
</template>
<script>
import Axios from "axios";
import AddToCart from "../components/AddToCart.vue";

export default {
  components: {
    AddToCart
  },
  data() {
    return {
      product: {}
    };
  },
  created() {
    const routeUrl = "/add-ons/" + this.$route.params.name;
    Axios.get(routeUrl).then(response => {
      this.product = response.data;
      this.product = this.product.indv_add_on;
    });
  }
};
</script>
