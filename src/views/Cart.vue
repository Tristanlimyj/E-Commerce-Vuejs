<template>
  <div class="Cart">
    <b-container class="cart-section" fluid>
      <b-row>
        <b-col sm="12" md="6" offset-md="3" lg="6" offset-lg="3" xl="6" offset-xl="3">
          <Alert v-if="showAlert" :message="message" :typeAlert="typeAlert" />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" offset-md="1" lg="5" offset-lg="2" xl="5" offset-xl="2">
          <h4>Cart</h4>
          <p v-if="emptyCart" id="empty-cart-msg">
            {{ this.emptyCartMsg }}
          </p>
          <div v-if="!emptyCart">
            <table id="indv-orders-table">
              <tr id="indv-orders-header">
                <td></td>
                <td>Bundle</td>
                <td>Value</td>
                <td></td>
              </tr>
              <CartIndvPro
                v-for="(order, index) in this.customerCart"
                :key="index"
                :order="order"
                @emptyCartChange="emptyCartChange($event)"
                @deleteItem="deleteItem($event)"
              />
            </table>
          </div>
          <div v-if="!emptyCart" class="deliver-options">
            <h4>Delivery Options</h4>
            <b-button
              class="delivery-btns"
              v-for="deliveryOption in deliveryBtns"
              :key="deliveryOption.id"
              :pressed="deliveryOption.state"
              @click="selectDeliveryOption(deliveryOption)"
            >
              {{ callTitlelize(deliveryOption.name) }}
            </b-button>
          </div>
          <div class="add-promo-code">
            <h4>Apply Promo Code</h4>
            <b-input-group size="md" class="add-promo-code-btn">
              <b-form-input v-model="promoCode" placeholder="Promo Code"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="emptyCart" @click="applyPromoCode" id="apply-promo-code-btn"
                  >Apply
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
        <b-col id="summary" sm="12" md="2" lg="2" xl="2">
          <h4>Summary</h4>
          <SummaryTable
            :subTotal="subTotal"
            :totalCost="totalCost"
            :emptyCart="emptyCart"
            :deliveryType="this.deliveryCost.name ? this.deliveryCost.name : '---'"
            :deliveryPrice="this.deliveryCost.price"
            :promoCode="this.confirmedCode.code ? this.confirmedCode.code : '---'"
            :promoCodeValue="this.confirmedCode.value"
          />
          <!-- Checkout Btn -->
          <div id="btn-outer-layer">
            <b-button
              :disabled="emptyCart"
              pill
              type="submit"
              class="checkout-btn"
              @click="checkoutPage"
            >
              Checkout
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Axios from "axios";
import Alert from "../components/Alert.vue";
import CartIndvPro from "../components/Cart/Components/CartIndvPro.vue";
import SummaryTable from "../components/Cart/Components/SummaryTable.vue";
import { stringFunctions as strfunction } from "../commonFunctions";

export default {
  components: {
    Alert,
    CartIndvPro,
    SummaryTable
  },
  data() {
    return {
      customerCart: {},

      // Promo Code
      promoCode: "",
      confirmedCode: {},
      // Deliver Options
      deliveryBtns: [],
      deliveryOptionId: null,
      deliveryCost: {},
      // Empty Cart Notification
      emptyCart: true,
      emptyCartMsg: "",
      // Notifications
      showAlert: false,
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
    /* Individual Product Component */
    emptyCartChange(change) {
      this.emptyCart = change.emptyCart;
      this.emptyCartMsg = change.emptyCartMsg;
    },
    deleteItem(removedItem) {
      this.customerCart = this.customerCart.filter(cartItem => cartItem !== removedItem);
    },
    /* Delivery Options Component */
    getDeliveryOptions() {
      Axios.get("/delivery").then(res => {
        this.deliveryBtns = this.addStatetoDeliveryOption(res.data.deliveryOptions);
      });
    },
    addStatetoDeliveryOption(deliveryOption) {
      for (let i = 0; i < deliveryOption.length; i += 1) {
        if (this.deliveryOptionId === deliveryOption[i].id) {
          deliveryOption[i].state = true;
          this.deliveryCost = deliveryOption[i];
        } else {
          deliveryOption[i].state = false;
        }
      }
      // if no delivery option cannot go to checkout
      return deliveryOption;
    },
    selectDeliveryOption(selectedOption) {
      for (let i = 0; i < this.deliveryBtns.length; i += 1) {
        if (this.deliveryBtns[i].id === selectedOption.id) {
          this.deliveryBtns[i].state = true;
          this.deliveryCost = this.deliveryBtns[i];
        } else {
          this.deliveryBtns[i].state = false;
        }
      }
      Axios.post("/delivery/add-delivery-method", {
        deliveryOptionId: selectedOption.id,
        cartId: this.$cookies.get("cartId")
      }).then(() => {
        this.deliveryOptionId = selectedOption.id;
      });
    },
    /* Promo-Code Component */
    applyPromoCode() {
      // This assumes that the have a cart
      Axios.post("/cart/add-promo-code", {
        promoCode: this.promoCode,
        cartId: this.$cookies.get("cartId")
      })
        .then(response => {
          this.confirmedCode = response.data.promoCode;
          this.promoCode = "";
          this.showMessage(response.data.message, "secondary");
        })
        .catch(err => {
          this.showMessage(err.response.data.message, "secondary");
        });
    },

    /* Checkout Button */
    checkoutPage() {
      const liquorInCart = this.customerCart.find(
        cartItem => cartItem.productData.isLiquor === true
      );
      if (!liquorInCart) {
        this.showMessage(
          "You will need to have a bundle in your cart before you can checkout",
          "secondary"
        );
      } else if (!this.deliveryOptionId) {
        this.showMessage(
          "You need to select a delivery method before you can checkout",
          "secondary"
        );
      } else {
        this.$router.push({ path: "/checkout" });
      }
    }
  },
  created() {
    let paramsCartId = "";
    if (this.$cookies.isKey("cartId")) {
      paramsCartId = this.$cookies.get("cartId");
    }

    Axios.post("/cart", { cartId: paramsCartId })
      .then(res => {
        const returnedData = res.data;
        if (returnedData.emptyCart) {
          this.emptyCart = true;
          this.emptyCartMsg = returnedData.message;
        } else {
          this.emptyCart = false;
          this.customerCart = returnedData.customerCart;
          this.deliveryOptionId = returnedData.deliveryOptionId;
          this.confirmedCode = returnedData.promoCode;
          this.getDeliveryOptions();
        }
      })
      .catch(err => {
        this.emptyCart = true;
        this.emptyCartMsg = "Unable to retrieve your cart!";
      });
  },
  computed: {
    subTotal() {
      let subTotal = 0;
      for (let i = 0; i < this.customerCart.length; i++) {
        subTotal += this.customerCart[i].productData.price;
      }
      return subTotal;
    },
    totalCost() {
      let total = this.subTotal;

      if (this.confirmedCode) total -= this.confirmedCode.value;
      if (this.deliveryOptionId) total += this.deliveryCost.price;
      return total;
    }
  }
};
</script>
<style scoped>
/* Mobile View */
@media only screen and (min-width: 768px) {
  .cart-section {
    min-height: 90vh;
    margin-top: 4rem;
  }
}
/* Tablet & Larger View */
@media only screen and (max-width: 768px) {
  .cart-section {
    min-height: 85vh;
    margin-top: 2rem;
  }
  .deliver-options {
    text-align: center;
  }

  #summary {
    margin-top: 4rem;
    text-align: center;
    max-width: 100%;
  }
  table {
    text-align: center;
    min-width: 90vw;
  }
}
/* Individual Product Table View */
#indv-orders-table {
  width: 100%;
}
.callTitlelize {
  padding: 0px !important;
}
#indv-orders-header {
  font-weight: bold;
}
/* Delivery Options */
.deliver-options {
  margin-bottom: 5vh;
}
.delivery-btns {
  background-color: white;
  color: black;
  margin-right: 0.75vw;
  margin-bottom: 1.2vh;
}
.delivery-btns.active {
  background-color: #222021 !important;
  color: white !important;
  box-shadow: unset !important;
}
/* Delivery Button */
#btn-outer-layer {
  background: white;
  margin: 0px;
  width: 100%;
  position: sticky;
  bottom: 0px;
  z-index: 1;
}

.checkout-btn {
  margin-top: 1.5rem;
  background-color: black;
  width: 220px;
}

@media only screen and (max-width: 768px) {
  .checkout-btn {
    width: 90%;
  }
}
</style>
