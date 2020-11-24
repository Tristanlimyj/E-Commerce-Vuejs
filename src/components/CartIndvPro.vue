<template>
  <tr
    class="indv-orders"
  >
    <td
      class="order-info"
    >
      <b-img
        v-if="liquorOrAddOn === 'liquor'"
        fluid
        :src="$store.state.apiurl.concat('/images/', order.liquor_info.image)"
      />
      <b-img
        v-if="liquorOrAddOn === 'addon'"
        fluid
        :src="$store.state.apiurl.concat('/images/', order.add_on_info.image)"
      />
    </td>
    <td
      class="order-info"
    >
      <h6
        v-if="liquorOrAddOn === 'liquor'"
      >
        {{  callTitlelize(order.liquor_info.name) }}
      </h6>
      <h6
        v-if="liquorOrAddOn === 'addon'"
      >
        {{  callTitlelize(order.add_on_info.name) }}
      </h6>
      <!-- If liqour only-->
      <div
        v-if="liquorOrAddOn === 'liquor'"
        class="mixer-section"
      >
        <div v-if="checkout">
          Mixer: {{ callTitlelize(order.mixer_info.name) }}
        </div>
          <b-form-select
            v-if="!checkout"
            class="change-mixer"
            v-model="customerCart.liquor[index].mixer_info"
            @change="changeMixer(customerCart.liquor[index])"
          >
            <b-form-select-option
              v-for="mixer in order.liquor_info.alt_mixer"
              :key="mixer"
              :value=mixer
            >
              Mixer: {{ callTitlelize(mixer.name)  }}
            </b-form-select-option>
          </b-form-select>
      </div>
    </td>
    <td
      class="order-info product-price"
    >
      <h6
        v-if="liquorOrAddOn === 'liquor'"
      >
        {{  order.liquor_info.price  }}
      </h6>
      <h6
        v-if="liquorOrAddOn === 'addon'"
      >
        {{  order.add_on_info.price  }}
      </h6>
    </td>
    <td
      v-if="!checkout"
    >
      <div
        class="remove-product"
        @click="removeProductFromCart(order.public_id, index)"
      >
        <i
          class="fas fa-times">
        </i>
      </div>
    </td>
  </tr>
</template>

<script>
import Axios from 'axios';
import { stringFunctions as strfunction } from '../commonFunctions';

export default {
  props: [
    'order',
    'index',
    'customerCart',
    'liquorOrAddOn',
    'emptyCart',
    'emptyCartMsg',
    'checkout',
  ],
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    changeMixer(product) {
      Axios.post('cart/change-bundle-mixer', {
        productId: product.public_id,
        mixerId: product.mixer_info.public_id,
      });
    },
    removeProductFromCart(product, index) {
      let urlPath = null;

      if (this.liquorOrAddOn === 'liquor') {
        urlPath = 'cart/remove-liquor-from-cart';
      } else if (this.liquorOrAddOn === 'addon') {
        urlPath = 'cart/remove-add-on-from-cart';
      } else {
        return false;
      }

      Axios.delete(urlPath, {
        data: {
          cartId: this.$cookies.get('cartId'),
          productId: product,
        },
      })
        .then((res) => {
          if (this.liquorOrAddOn === 'liquor') {
            this.customerCart.liquor.splice(index, 1);
          }

          if (this.liquorOrAddOn === 'addon') {
            this.customerCart.add_on.splice(index, 1);
          }
          const returnValue = res.data;

          if (returnValue.empty_cart) {
            this.$emit('emptyCartChange', { emptyCart: returnValue.empty_cart, emptyCartMsg: returnValue.message });
          }
        });
      return true;
    },
  },
};
</script>

<style scoped>
/* Mobile View */
@media only screen and (min-width: 768px){
  .order-info {
    padding-right: 3vw;
  }
}
/* Tablet & Larger View */
@media only screen and (max-width: 768px){
  img {
    max-width: 5rem!important;
  }
}
.remove-product {
  padding-right: 2vw;
}
.remove-product:hover {
  cursor: pointer;
}
img {
  max-width: 7.5rem;
}
.order-info {
  padding-top: 1vh;
  padding-bottom: 3vh;
  text-align: left;
}
.product-price{
  text-align: center;
}

</style>
