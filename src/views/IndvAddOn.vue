<template>
  <div class="indv-pro">
    <addToCart
      :product='product'
      liquorOrAddOn=''
      addToCartUrl='cart/add-to-cart-add-on'
    />
  </div>
</template>
<script>
import Axios from 'axios';
import AddToCart from '../components/AddToCart.vue';

export default {
  components: {
    AddToCart,
  },
  data() {
    return {
      product: {},
    };
  },
  created() {
    let productUrl = 'add-on/indv_add_on/';
    productUrl += this.$route.params.name;

    Axios.get(productUrl)
      .then((response) => {
        this.product = response.data;
        this.product = this.product.indv_add_on;
      });
  },
};
</script>
