<template>
  <div class="dashboard">
    <b-container fluid>
      <b-row>
        <b-col
          sm="6"
          md="6"
          offset-lg="2"
          lg="3"
          offset-xl="2"
          xl="3"
        >
          <h1>Products</h1>
        </b-col>
        <b-col
          sm="6"
          md="6"
          offset-lg="3"
          lg="3"
          offset-xl="3"
          xl="3"
        >
          <b-button
              id="add-product-btn"
              variant="primary"
              to="/admin/add-product"
          >
            Add Products
          </b-button>
        </b-col>
      </b-row>
       <b-col
         sm="12"
         md="12"
         offset-lg="2"
         lg="8"
         offset-xl="2"
         xl="8"
       >
       <b-row>
         <b-table
          class="product-table"
          hover
          tbody-tr-class='product-data'
          :bordered=true
          :items="products"
          :fields="fields"
         >
          <template #cell(coverphoto)="data">
            <b-img
              :src="apiUrl + '/images/' + data.item.coverphoto"
              class="product-img"
            />
          </template>
          <template #cell(name)="data">
            {{ callTitlelize(data.item.name) }}
          </template>
          <template #cell(price)="data">
            ${{ data.item.price }}
          </template>
          <template #cell(category)="data">
            {{ callTitlelize(data.item.category) }}
          </template>
          <template #cell(actions)="data">
            <div class="d-flex justify-content-center">
                <b-button
                  :href="'/products/' + data.item.name.replace(/\s/g, '-')"
                  variant="secondary"
                >
                View
                </b-button>
                <b-button
                  :href="'/admin/product/edit/' + data.item.name.replace(/\s/g, '-')"
                  variant="primary"
                >
                Edit
                </b-button>
                <b-button
                  variant="danger"
                  @click="deleteProduct(data.item.public_id )"
                >
                  Delete
                </b-button>
              </div>
          </template>
         </b-table>
       </b-row>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios';
import { stringFunctions as strfunction } from '../../commonFunctions';

export default {
  data() {
    return {
      apiUrl: this.$store.state.apiurl,
      fields: [
        {
          key: 'coverphoto',
          label: 'Image',
          tdClass: 'product-data',
        },
        {
          key: 'name',
          label: 'Bundle Name',
          sortable: true,
          tdClass: 'product-data',
        },
        {
          key: 'price',
          label: 'Bundle Price',
          sortable: true,
          tdClass: 'product-data',
        },
        {
          key: 'category',
          label: 'Category',
          sortable: true,
          tdClass: 'product-data',
        },
        {
          key: 'actions',
          label: 'Actions',
          tdClass: 'product-data',
        },
      ],
      products: {},
      empty: '',
    };
  },
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    deleteProduct(pubId) {
      const confirmation = window.confirm('Are you sure you want to delete this post?');
      if (confirmation) {
        axios.delete('products/remove_product', {
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
        this.products = response.data.product_info;
      });
  },
};
</script>
<style scoped>
#add-product-btn {
  margin-bottom: 1rem;
}
.product-table {
  text-align: center;
}
.product-data {
  vertical-align: middle !important;
}
.btn {
  margin: 0.2rem;
}
.product-img {
  max-width: 5vw;
}
</style>
