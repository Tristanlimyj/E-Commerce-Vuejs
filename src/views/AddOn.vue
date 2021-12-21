<template>
  <div class="Products">
    <ShowCaseProducts :loading="loading" :products="products" link="add-on/" />
  </div>
</template>

<script>
import Axios from "axios";
import ShowCaseProducts from "../components/ShowCaseProducts.vue";

export default {
  components: {
    ShowCaseProducts
  },
  data() {
    return {
      products: [],
      loading: true
    };
  },
  created() {
    Axios.get("add-ons").then(res => {
      const returnedData = res.data;

      this.products = returnedData.addOns;
      this.loading = false;
    });
  }
};
</script>
