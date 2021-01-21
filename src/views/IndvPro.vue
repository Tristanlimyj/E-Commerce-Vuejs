<template>
  <div class="indv-pro">
    <addToCart
      :product='product'
      liquorOrAddOn='liquor'
      addToCartUrl='/cart/add-to-cart-liquor'
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
    let productUrl = 'products/indv-product/';
    productUrl += this.$route.params.name;

    Axios.get(productUrl)
      .then((response) => {
        this.product = response.data;
        this.product = this.product.returned_product;
      })
      .catch(() => {
        this.product = false;
      });
  },
};
</script>
