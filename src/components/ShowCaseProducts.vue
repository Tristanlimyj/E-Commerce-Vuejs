<template>
  <div class="Products">
    <b-container class="nav-bar" fluid>
      <PublicNav/>
    </b-container>
    <b-container class='search-bar-filter' fluid>
      <b-row>
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          offset-lg='3'
          xl="6"
          xl-offset='3'
        >
          <b-input-group prepend="Search">
            <b-form-input
              v-model="searchInput"
              placeholder='What would you like?'
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="filter-area">
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          offset-lg='3'
          xl="6"
          xl-offset='3'
        >
          <label
            v-for="cat in productCategory" :key="cat"
            class="filter-checkbox"
          >
            {{ callTitlelize(cat) }}
            <input type="checkbox" v-on:click="filterCategory(cat)">
            <span class="checkmark"></span>
          </label>
        </b-col>
      </b-row>
    </b-container>
    <b-container class='product-body' fluid>
      <b-row>
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          offset-lg='3'
          xl="6"
          xl-offset='3'
          v-if='filterdProducts.length === 0'
          id = 'no-product'
        >
          <h5>We are unable to find the what you were looking for:(</h5>
        </b-col>
      <b-col
        v-for="product in filterdProducts" :key="product.public_id"
        cols="6"
        sm="6"
        md="6"
        lg="3"
        xl="3"
      >
        <a :href="link + product.name.replace(/\s/g, '-')">
          <b-card
          :img-src="$store.state.apiurl + '/images/' + product.coverphoto"
          :title="callTitlelize(product.name)"
          >
            <template #footer>
              <b-button class="add-to-cart-btn" pill>Purchase</b-button>
            </template>
          </b-card>
        </a>
      </b-col>
      </b-row>
    </b-container>
    <b-container class="footer-container" fluid>
      <PublicFooter/>
    </b-container>
  </div>
</template>

<script>
import PublicNav from './PublicNav.vue';
import PublicFooter from './PublicFooter.vue';
import { stringFunctions as strfunction } from '../commonFunctions';

export default {
  components: {
    PublicNav,
    PublicFooter,
  },
  props: ['products', 'link'],
  data() {
    return {
      searchInput: '',
      selectedCategory: [],
    };
  },
  methods: {
    callTitlelize(sentence) {
      return strfunction.titlelize(sentence);
    },
    filterCategory(category) {
      if (this.selectedCategory.includes(category)) {
        this.selectedCategory = this.selectedCategory.filter(
          (cat) => cat !== category,
        );
      } else {
        this.selectedCategory.push(category);
      }
    },
  },
  computed: {
    filterdProducts() {
      const results = [];
      if (this.selectedCategory.length === 0 && !(this.searchInput)) { return this.products; }

      for (let i = 0; i < this.products.length; i += 1) {
        if (
          this.selectedCategory.length !== 0
          && this.selectedCategory.includes(this.products[i].category)
        ) {
          results.push(this.products[i]);
        }
        if (
          this.searchInput
          && (this.products[i].name.includes(this.searchInput)
          || this.products[i].category.includes(this.searchInput))
        ) {
          results.push(this.products[i]);
        }
      }
      return results;
    },
    productCategory() {
      const productCategory = [];
      for (let i = 0; i < this.products.length; i += 1) {
        if (!(productCategory.includes(this.products[i].category))) {
          productCategory.push(this.products[i].category);
        }
      }
      return productCategory;
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 720px) {
    .card-body {
        height: 10vh;
    }
}
  .search-bar-filter {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .card-title {
    font-size: 1rem;
    color: black !important;
  }
  a:hover {
    text-decoration: none !important;
  }
  .card {
    border: none;
  }
  .card-body {
    padding: 0px;
    padding-top: 1rem;
    text-align: center;
  }
  .card-footer{
      padding: 0px!important;
      text-align: center;
      background-color: transparent;
      border-top: none;
      padding-bottom: 3vh!important;
  }
  .add-to-cart-btn {
    background-color: black;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }
  .filter-checkbox {
    padding: 1rem;
    font-size: 1.1rem;
    font-style: oblique;
  }
  .filter-area {
    text-align: center;
  }
  #no-product {
    text-align: center;
  }
  .product-body {
    min-height: 60vh;
  }
  .Products {
    min-height: 100vh;
  }
</style>
