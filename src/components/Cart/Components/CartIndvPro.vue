<template>
  <tr class="indv-orders">
    <td class="order-info">
      <b-img fluid :src="`products/${order.productData.coverphoto}`" />
    </td>
    <td class="order-info">
      <h6>
        {{ callTitlelize(order.productData.name) }}
      </h6>
      <!-- If liquor only-->
      <div v-if="order.productData.isLiquor" class="mixer-section">
        <b-form-select
          class="change-mixer"
          v-model="order.productData.mixer.currentMixer"
          @change="changeMixer"
        >
          <b-form-select-option
            v-for="mix in order.productData.mixer.mixerOptions"
            :key="mix.id"
            :value="mix"
          >
            Mixer: {{ callTitlelize(mix.name) }}
          </b-form-select-option>
        </b-form-select>
      </div>
    </td>
    <td class="order-info product-price">
      <h6>
        {{ order.productData.price }}
      </h6>
    </td>
    <td>
      <div class="remove-product" @click="removeProductFromCart">
        <i class="fas fa-times"> </i>
      </div>
    </td>
  </tr>
</template>

<script>
import Axios from "axios";
import { stringFunctions as strfunction } from "../../../commonFunctions";

export default {
  props: ["order", "emptyCartChange"],
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    changeMixer() {
      Axios.post("/cart/change-bundle-mixer", {
        cartItemId: this.order.cartItemId,
        mixerId: this.order.productData.mixer.currentMixer.id
      });
    },
    removeProductFromCart() {
      Axios.delete("/cart/remove-item", {
        data: {
          cartItemId: this.order.cartItemId
        }
      }).then(res => {
        const returnValue = res.data;

        if (returnValue.emptyCart) {
          this.$emit("emptyCartChange", {
            emptyCart: returnValue.emptyCart,
            emptyCartMsg: returnValue.message
          });
        } else {
          this.$emit("deleteItem", this.order);
        }
      });
      return true;
    }
  }
};
</script>

<style scoped>
/* Mobile View */
@media only screen and (min-width: 768px) {
  .order-info {
    padding-right: 3vw;
  }
}
/* Tablet & Larger View */
@media only screen and (max-width: 768px) {
  img {
    max-width: 5rem !important;
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
.change-mixer {
  padding-left: 0px;
}
.product-price {
  text-align: center;
}
</style>
