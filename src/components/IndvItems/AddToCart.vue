<template>
  <div class="add-to-cart">
    <b-container class="product-view" fluid>
      <b-row v-if="product">
        <b-col sm="12" md="6" offset-md="3" lg="6" offset-lg="3" xl="6" offset-xl="3">
          <Alert v-if="showAlert" :message="message" :typeAlert="typeAlert" />
        </b-col>
      </b-row>
      <b-row class="individual-product" v-if="product">
        <b-col class="product-image" sm="12" md="6" lg="4" offset-lg="2" xl="4" offset-xl="2">
          <b-img fluid v-if="product.coverphoto" :src="`/products/${this.product.coverphoto}`" />
        </b-col>
        <b-col
          class="product-info"
          sm="12"
          offset-md="1"
          md="5"
          offset-lg="1"
          lg="3"
          offset-xl="1"
          xl="3"
        >
          <ProductInfo
            :productName="product.name"
            :productPrice="product.price"
            :callTitlelize="callTitlelize"
          />
          <b-form class="product-form" @submit.prevent="addToCart">
            <b-form-group
              v-if="isLiquor"
              class="mixer-selection"
              label="Select your mixer/bundle:"
              label-for="mixer-selection"
            >
              <b-form-radio-group
                v-if="product.mixer"
                id="mixer-selection-radio"
                v-model="cartForm.mixer"
                name="mixer-selection"
                :options="mixerOptions(product.mixer)"
                required
              ></b-form-radio-group>
            </b-form-group>
            <b-button pill type="submit">Add to Cart</b-button>
          </b-form>
        </b-col>
      </b-row>
      <NoProduct v-if="!product" />
    </b-container>
  </div>
</template>
<script>
import Axios from "axios";
import Alert from "../Alert.vue";
import NoProduct from "./Components/NoProduct.vue";
import ProductInfo from "./Components/ProductInfo.vue";
import { stringFunctions as strfunction } from "../../commonFunctions";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    Alert,
    NoProduct,
    ProductInfo
  },
  props: ["product", "isLiquor"],
  data() {
    return {
      cartForm: {
        mixer: ""
      },
      showAlert: false,
      options: [],
      message: "",
      typeAlert: ""
    };
  },
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    showMessage(message, typeAlert) {
      this.typeAlert = typeAlert;
      this.message = message;
      this.showAlert = true;
    },
    addToCart() {
      // Check if there is already a key linking this session that is linked to a cart
      const notFirstPurchase = this.$cookies.isKey("cartId");

      let payload = this.payloadCreate();

      if (notFirstPurchase) {
        payload.cartId = this.$cookies.get("cartId");
      } else {
        const cartId = uuidv4();
        payload.cartId = cartId;
        this.$cookies.set("cartId", cartId, "7d");
      }

      Axios.post("/add-to-cart", payload)
        .then(() => {
          this.$router.push({ name: "Cart" });
        })
        .catch(() => {
          this.showMessage("Unable to add to cart", "danger");
        });
    },
    payloadCreate() {
      if (this.isLiquor) {
        return {
          productId: this.product.publicId,
          mixer: this.cartForm.mixer,
          isLiquor: this.isLiquor
        };
      }
      return {
        productId: this.product.publicId,
        isLiquor: this.isLiquor
      };
    },
    mixerOptions(mixer) {
      let returnedMixer = [];
      for (let x = 0; x < mixer.length; x += 1) {
        returnedMixer.push({ text: mixer[x].name, value: mixer[x].id });
      }
      return returnedMixer;
    }
  }
};
</script>
<style scoped>
@media only screen and (min-width: 768px) {
  .product-info {
    margin-top: 10vh !important;
  }
  .btn {
    margin-top: 1rem;
  }
}
@media only screen and (max-width: 768px) {
  .product-info {
    margin-top: 2.5rem !important;
    min-height: 37vh !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .btn {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
.product-form {
  text-align: center;
}
.product-view {
  margin-top: 1.5rem;
  min-height: 60vh;
}
.product-info {
  min-height: 50vh;
  text-align: center;
}
.product-name {
  font-weight: bold;
  text-align: center;
}
.product-price {
  margin-top: 1rem;
}
.mixer-selection {
  margin-top: 1.5rem;
  font-weight: bold;
}
.btn {
  background-color: black;
  width: 355px;
}
</style>
