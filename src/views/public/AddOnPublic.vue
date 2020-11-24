<template>
  <div class="Products">
    <ShowCaseProducts
      :products='products'
      link='add-on/'
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
    Axios.get('add-on')
      .then((res) => {
        const returnedData = res.data;
        this.products = returnedData.add_on_info;
      });
  },
};
</script>
