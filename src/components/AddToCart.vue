<template>
  <div class="add-to-cart">
    <b-container class="nav-bar" fluid>
      <PublicNav/>
    </b-container>
    <b-container class="product-view" fluid>
      <b-row
        v-if="product"
      >
        <b-col
          sm="12"
          md="6"
          offset-md="3"
          lg="6"
          offset-lg="3"
          xl="6"
          offset-xl="3"
        >
          <Alert
            v-if="showAlert"
            :message=message
            :typeAlert=typeAlert
          />
        </b-col>
      </b-row>
      <b-row
        class="individual-product"
        v-if="product"
      >
        <b-col
        class="product-image"
        sm="12"
        md="6"
        lg="4"
        offset-lg="2"
        xl="4"
        offset-xl="2"
        >
          <b-img
            fluid
            v-if="product.coverphoto"
            :src="base + '/images/' + this.product.coverphoto"
          />
        </b-col >
        <b-col
        class="product-info"
        sm='12'
        offset-md="1"
        md='5'
        offset-lg="1"
        lg='3'
        offset-xl="1"
        xl='3'
        >
          <h2 id="product-name">
            {{ callTitlelize(this.product.name) }}
          </h2>
          <h5 id="product-price"><strong>Price:</strong> ${{ this.product.price }}</h5>

          <b-form @submit.prevent="addToCart">
            <b-form-group
              v-if="liquorOrAddOn === 'liquor'"
              id="mixer-selection"
              label="Select your mixer/bundle:"
              label-for="mixer-selection"
            >
              <b-form-radio-group
                v-if="product.mixer"
                id="mixer-selection-radio"
                v-model="cartForm.mixer"
                name="mixer-selection"
                :options="JSON.parse(product.mixer)"
                required
              ></b-form-radio-group>
            </b-form-group>
            <b-button pill type="submit">Add to Cart</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row
        class="no-product"
        v-if="!product"
      >
        <b-col
        sm="12"
        md="12"
        lg="8"
        offset-lg="2"
        xl="8"
        offset-xl="2"
        >
          <h3>The Product that you are looking for is no longer available</h3>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="footer-container" fluid>
      <PublicFooter/>
    </b-container>
  </div>

</template>
<script>
import Axios from 'axios';
import PublicNav from './PublicNav.vue';
import PublicFooter from './PublicFooter.vue';
import Alert from './Alert.vue';
import { stringFunctions as strfunction } from '../commonFunctions';

export default {
  components: {
    PublicNav,
    PublicFooter,
    Alert,
  },
  props: ['product', 'liquorOrAddOn', 'addToCartUrl'],
  data() {
    return {
      base: this.$store.state.apiurl,
      cartForm: {
        mixer: '',
      },
      showAlert: false,
      message: '',
      typeAlert: '',
    };
  },
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    mixerFunc(mix) {
      let i = 0;
      for (i; i < mix.length; i += 1) {
        this.cartForm.mixer.push(this.product[0].mixer[mix[i]]);
      }
    },
    showMessage(message, typeAlert) {
      this.typeAlert = typeAlert;
      this.message = message;
      this.showAlert = true;
    },
    addToCart() {
      if (this.$cookies.isKey('cartId')) {
        const payload = this.payloadCreate();
        payload.cartId = this.$cookies.get('cartId');

        Axios.post(this.addToCartUrl, payload)
          .then((res) => {
            const returnValue = res.data;
            this.showMessage(returnValue.message, 'success');
          });
      } else {
        const payload = this.payloadCreate();

        Axios.post(this.addToCartUrl, payload)
          .then((res) => {
            const returnValue = res.data;
            this.$cookies.set('cartId', returnValue.cart_id, '7d');
            this.showMessage(returnValue.message, 'success');
          })
          .catch((err) => {
            this.showMessage(err.data, 'danger');
          });
      }
    },
    payloadCreate() {
      if (this.liquorOrAddOn === 'liquor') {
        return {
          productId: this.product.public_id,
          mixer: this.cartForm.mixer,
        };
      }
      return {
        productId: this.product.public_id,
      };
    },
  },
};
</script>
<style scoped>
@media only screen and (min-width: 768px) {
  .product-info {
     margin-top: 10vh!important;
  }
  .btn {
    margin-top: 1rem;
  }
}
@media only screen and (max-width: 768px) {
  .product-info {
    margin-top: 2.5rem !important;
    min-height: 37vh !important;
  }
  .btn {
    margin-top: 1.5rem;
  }
  .footer-container {
    padding-top: 0px;
  }
}

.product-view {
  margin-top: 1.5rem;
  min-height: 60vh;
}
.product-info{
  min-height: 50vh;
  text-align: center;
}
#product-name {
  font-weight: bold;
  text-align: center;
}
#product-price {
  margin-top: 1rem;
}
#mixer-selection {
  margin-top: 1.5rem;
  font-weight: bold;
}
.btn {
  background-color: black;
  width: 355px;
}
.no-product {
  text-align: center;
}
</style>
