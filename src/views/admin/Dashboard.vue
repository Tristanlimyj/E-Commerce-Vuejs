<template>
  <div class="dashboard">
    <b-container fluid>
      <b-row>
        <div v-for="(product, index) in products" :key="index">
          <b-card
          :title="product.name"
          :img-src="apiUrl + '/images/' + product.coverphoto"
          :img-alt="product.name"
          img-top
          style="max-width: 20rem; text-align: center;"
          class="mb-2 product"
          >
            <div class="d-flex justify-content-center">
              <b-button
                :href="'/admin/product/' + product.name.replace(/\s/g, '-')"
                variant="secondary"
              >
              View
              </b-button>
              <b-button
                :href="'/admin/product/edit/' + product.name.replace(/\s/g, '-')"
                variant="primary"
              >
              Edit
              </b-button>
              <b-button
                variant="danger"
                @click="deleteProduct(product.public_id )"
              >
                Delete
              </b-button>
            </div>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: this.$store.state.apiurl,
      products: {},
      empty: '',
    };
  },
  methods: {
    deleteProduct(pubId) {
      const confirmation = window.confirm('Are you sure you want to delete this post?');
      if (confirmation) {
        axios.delete('remove_product', {
          headers: { 'x-access-token': this.$cookies.get('token') },
          data: { public_id: pubId },
        })
          .then(() => {
            window.location.reload();
          });
      }
    },
  },
  created() {
    axios.get('products')
      .then((response) => {
        this.products = response.data;
      });
  },
};
</script>
<style scoped>
.product {
  max-width: auto;
  max-height: 25%;
}
.btn {
  margin: 0.2rem;
}
img {
  height: 100%;
  width: 100%;
}
</style>
