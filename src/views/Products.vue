<template>
  <div class="Products">
    <ShowCaseProducts :products="products" :loading="loading" link="products/" />
  </div>
</template>

<script>
import Axios from "axios";
import ShowCaseProducts from "../components/ShowCaseProducts/ShowCaseProducts.vue";

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
    Axios.get("/products").then(res => {
      const returnedData = res.data;
      this.loading = false;
      this.products = returnedData.products;
    });
  }
};
</script>
