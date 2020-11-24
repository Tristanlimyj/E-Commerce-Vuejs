<template>
  <div class="Products">
    <ShowCaseProducts
      :products='products'
      link='products/'
    />
  </div>
</template>

<script>
import Axios from 'axios';
import ShowCaseProducts from '../../components/ShowCaseProducts.vue';

export default {
  components: {
    ShowCaseProducts,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    Axios.get('products')
      .then((res) => {
        const returnedData = res.data;
        this.products = returnedData.product_info;
      });
  },
};
</script>
