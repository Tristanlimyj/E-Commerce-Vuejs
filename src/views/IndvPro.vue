<template>
  <div class="indv-pro">
    <addToCart :product="product" :isLiquor="true" />
  </div>
</template>
<script>
import Axios from "axios";
import AddToCart from "../components/IndvItems/AddToCart.vue";

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
    const productUrl = "/products/" + this.$route.params.name;

    Axios.get(productUrl)
      .then(response => {
        this.product = response.data.product;
      })
      .catch(() => {
        this.product = false;
      });
  }
};
</script>
