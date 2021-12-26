<template>
  <div class="products">
    <b-container class="search-bar-filter" fluid>
      <b-row>
        <b-col
          class="search-bar"
          cols="12"
          sm="12"
          md="12"
          lg="6"
          offset-lg="3"
          xl="6"
          xl-offset="3"
        >
          <b-input-group prepend="Search">
            <b-form-input v-model="searchInput" placeholder="What would you like?"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="filter-area">
        <b-col cols="12" sm="12" md="12" lg="6" offset-lg="3" xl="6" xl-offset="3">
          <label v-for="cat in productCategory" :key="cat" class="filter-checkbox">
            {{ titlelize(cat) }}
            <input type="checkbox" v-on:click="filterCategory(cat)" />
            <span class="checkmark"></span>
          </label>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="product-body" fluid>
      <b-row>
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          offset-lg="3"
          xl="6"
          xl-offset="3"
          v-if="filterdProducts.length === 0"
          id="no-product"
        >
          <IfNoProducts :loading="loading" />
        </b-col>
        <b-col
          v-for="product in filterdProducts"
          :key="product.publicId"
          cols="6"
          sm="6"
          md="6"
          lg="3"
          xl="3"
        >
          <ProductCard
            :coverphoto="product.coverphoto"
            :name="product.name"
            :price="product.price"
            :titlelize="titlelize"
            :link="link"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import titlelizeMixin from "../mixins/titlelizeMixin";
import ProductCard from "./Components/ProductCard.vue";
import IfNoProducts from "./Components/IfNoProducts.vue";

export default {
  props: ["products", "link", "loading"],
  mixins: [titlelizeMixin],
  components: { ProductCard, IfNoProducts },
  data() {
    return {
      searchInput: "",
      selectedCategory: []
    };
  },
  methods: {
    filterCategory(category) {
      if (this.selectedCategory.includes(category)) {
        this.selectedCategory = this.selectedCategory.filter(cat => cat !== category);
      } else {
        this.selectedCategory.push(category);
      }
    }
  },
  computed: {
    filterdProducts() {
      const results = [];
      if (this.selectedCategory.length === 0 && !this.searchInput) {
        return this.products;
      }

      for (let i = 0; i < this.products.length; i += 1) {
        if (
          this.selectedCategory.length !== 0 &&
          this.selectedCategory.includes(this.products[i].category)
        ) {
          results.push(this.products[i]);
        }
        if (
          this.searchInput &&
          (this.products[i].name.includes(this.searchInput.toLowerCase()) ||
            this.products[i].category.includes(this.searchInput))
        ) {
          results.push(this.products[i]);
        }
      }
      return results;
    },
    productCategory() {
      const productCategory = [];
      for (let i = 0; i < this.products.length; i += 1) {
        if (!productCategory.includes(this.products[i].category)) {
          productCategory.push(this.products[i].category);
        }
      }
      return productCategory;
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 720px) {
  .card-body {
    height: 15vh;
  }
  .filter-checkbox {
    padding: 0px 0.8vw 0.4vh 0.8vw !important;
  }
  .search-bar {
    margin-bottom: 1.25rem;
  }
}
.search-bar-filter {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.filter-checkbox {
  padding: 1rem;
  font-size: 1.1rem;
  font-style: oblique;
}
.filter-area {
  text-align: center;
}
.product-body {
  min-height: 60vh;
}
.products {
  min-height: 100vh;
}
</style>
