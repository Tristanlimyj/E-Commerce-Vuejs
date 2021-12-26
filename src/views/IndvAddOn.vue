<template>
  <div class="indv-pro">
    <addToCart :product="product" :isLiquor="false" />
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
    const routeUrl = "/add-ons/" + this.$route.params.name;
    Axios.get(routeUrl).then(response => {
      this.product = response.data.addOn;
    });
  }
};
</script>
