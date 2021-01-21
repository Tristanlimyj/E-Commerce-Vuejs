<template>
  <div class="Products">
    <ShowCaseProducts
      :loading='loading'
      :products='products'
      link='add-on/'
    />
  </div>
</template>

<script>
import Axios from 'axios';
import ShowCaseProducts from '../components/ShowCaseProducts.vue';

export default {
  components: {
    ShowCaseProducts,
  },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  created() {
    Axios.get('add-on')
      .then((res) => {
        const returnedData = res.data;
        this.loading = false;
        this.products = returnedData.add_on_info;
      });
  },
};
</script>
