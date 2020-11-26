<template>
  <div class="Cart">
    <b-container class="nav-bar" fluid>
      <PublicNav/>
    </b-container>
    <b-container class="cart-section" fluid>
      <b-row>
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
      <b-row>
        <b-col
          sm="12"
          md="6"
          offset-md="1"
          lg="5"
          offset-lg="2"
          xl="5"
          offset-xl="2"
        >
          <h4>Cart</h4>
          <p v-if="emptyCart" id="empty-cart-msg">
            {{ this.emptyCartMsg }}
          </p>
          <div v-if="!emptyCart" >
            <table
              id="indv-orders-table"
            >
              <tr
                id="indv-orders-header"
              >
                <td></td>
                <td>Bundle</td>
                <td>Value</td>
                <td></td>
              </tr>
              <CartIndvPro
                v-for="(order, index) in this.customerCart.liquor" :key="index"
                :order="order"
                :index="index"
                :customerCart="customerCart"
                :emptyCart="emptyCart"
                :emptyCartMsg="emptyCartMsg"
                liquorOrAddOn='liquor'
                @emptyCartChange='emptyCartChange($event)'
              />
              <CartIndvPro
                v-for="(order, index) in this.customerCart.add_on" :key="index"
                :order="order"
                :index="index"
                :customerCart="customerCart"
                :emptyCart="emptyCart"
                :emptyCartMsg="emptyCartMsg"
                liquorOrAddOn='addon'
                @emptyCartChange='emptyCartChange($event)'
              />
            </table>
          </div>
          <div v-if="!emptyCart" class="deliver-options">
            <h4>Delivery Options</h4>
            <b-button
              class="delivery-btns"
              v-for="deliveryOption in deliveryBtns"
              :key="deliveryOption"
              :pressed="deliveryOption.state"
              @click="selectDeliveryOption(deliveryOption)"
            >
              {{ deliveryOption.delivery_type }}
            </b-button>
          </div>
          <div class="add-promo-code">
            <h4>Apply Promo Code</h4>
            <b-input-group
              size="md"
              class="add-promo-code-btn"
            >
              <b-form-input
                v-model="promoCode"
                placeholder='Promo Code'
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  @click="applyPromoCode()"
                  id='apply-promo-code-btn'
                >Apply
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
        <b-col
          id="summary"
          sm="12"
          md="2"
          lg="2"
          xl="2"
        >
          <h4>Summary</h4>
          <table>
            <tr>
              <td
                class="summary-label">Subtotal</td>
              <td class="summary-value" v-if="!emptyCart">
                {{ subTotal }}
              </td>
              <td class="summary-value" v-else>-</td>
            </tr>
            <tr>
              <td
                class="summary-label"
              >
                Delivery
                <br>
                ({{ this.deliveryCost.delivery_type }})
              </td>
              <td class="summary-value" v-if="!emptyCart">
                {{ this.deliveryCost.price }}
              </td>
              <td class="summary-value" v-else>-</td>
            </tr>
            <tr>
              <td
                id="last-component"
                class="summary-label">Promo Code<br>
                <div
                  v-if="!emptyCart && customerCart.promo_code"
                >
                  ({{ this.customerCart.promo_code.code }})
                </div>
              </td>
              <td class="summary-value" v-if="!emptyCart && customerCart.promo_code">
                {{ this.customerCart.promo_code.value }}
              </td>
              <td class="summary-value" v-else>-</td>
            </tr>
            <tr id="total-value" >
              <td
                class="summary-label">Total</td>
              <td class="summary-value" v-if="!emptyCart">
                {{ totalCost }}
              </td>
              <td class="summary-value" v-else>-</td>
            </tr>
          </table>
          <div id="btn-outer-layer">
            <b-button
              v-if="!emptyCart"
              pill
              type="submit"
              id="checkout-btn"
              @click="checkoutPage"
            >
              Checkout
            </b-button>
            <b-button
              v-if="emptyCart"
              pill
              type="submit"
              id="checkout-btn"
              disabled
            >
              Checkout
            </b-button>
          </div>
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
import PublicNav from '../../components/PublicNav.vue';
import PublicFooter from '../../components/PublicFooter.vue';
import Alert from '../../components/Alert.vue';
import CartIndvPro from '../../components/CartIndvPro.vue';
import { stringFunctions as strfunction } from '../../commonFunctions';

export default {
  components: {
    PublicNav,
    PublicFooter,
    Alert,
    CartIndvPro,
  },
  data() {
    return {
      customerCart: {},
      // Promo Code
      promoCode: '',
      // Deliver Options
      deliveryBtns: [],
      // Cart Summary
      deliveryCost: {},
      // Empty Cart Notification
      emptyCart: false,
      emptyCartMsg: '',
      // Notifications
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
    showMessage(message, typeAlert) {
      this.typeAlert = typeAlert;
      this.message = message;
      this.showAlert = true;
    },
    selectDeliveryOption(selectedOption) {
      for (let i = 0; i < this.deliveryBtns.length; i += 1) {
        if (this.deliveryBtns[i].delivery_type === selectedOption.delivery_type) {
          this.deliveryBtns[i].state = true;
          this.deliveryCost = this.deliveryBtns[i];
        } else {
          this.deliveryBtns[i].state = false;
        }
      }
      Axios.post('cart/add-delivery-method', {
        public_id: selectedOption.public_id,
        cartId: this.$cookies.get('cartId'),
      })
        .then(() => {
          this.customerCart.delivery_method = selectedOption;
        });
    },
    addStatetoDeliveryOption(options) {
      const deliveryOption = options;
      for (let i = 0; i < options.length; i += 1) {
        if (this.customerCart.delivery_method.public_id === deliveryOption[i].public_id
        ) {
          deliveryOption[i].state = true;
          this.deliveryCost = deliveryOption[i];
        } else {
          deliveryOption[i].state = false;
        }
      }
      // if no delivery option cannot go to checkout
      return deliveryOption;
    },
    applyPromoCode() {
      // This assumes that the have a cart
      Axios.post('cart/add-promo-code-cart', {
        promoCode: this.promoCode,
        cartId: this.$cookies.get('cartId'),
      })
        .then((res) => {
          const returnedData = res.data;
          this.customerCart.promo_code = returnedData.promo_code_info;
          this.promoCode = '';
        })
        .catch((err) => {
          this.showMessage(err.response.data.message, 'danger');
        });
    },
    emptyCartChange(change) {
      this.emptyCart = change.emptyCart;
      this.emptyCartMsg = change.emptyCartMsg;
    },
    checkoutPage() {
      if (this.customerCart.liquor.length === 0) {
        this.showMessage('You will need to have a bundle in your cart before you can checkout', 'secondary');
      } else if (!this.customerCart.delivery_method) {
        this.showMessage('You need to select a delivery method before you can checkout', 'secondary');
      } else {
        this.$router.push({ name: 'Checkout' });
      }
    },
    getDeliveryOptions() {
      Axios.get('delivery/current-delivery-options')
        .then((res) => {
          this.deliveryBtns = this.addStatetoDeliveryOption(res.data.delivery_options);
        });
    },
  },
  created() {
    let paramsCartId = '';
    if (this.$cookies.isKey('cartId')) {
      paramsCartId = this.$cookies.get('cartId');
    } else {
      paramsCartId = false;
    }

    Axios.post('cart/view-cart', { cartId: paramsCartId })
      .then((res) => {
        const returnedData = res.data;
        this.customerCart = returnedData.customer_cart;
        this.getDeliveryOptions();
      })
      .catch((err) => {
        this.emptyCart = true;
        this.emptyCartMsg = err.response.data.message;
      });
  },
  computed: {
    subTotal() {
      let subTotal = 0;
      let i = 0;
      for (i; i < this.customerCart.liquor.length; i += 1) {
        subTotal += this.customerCart.liquor[i].liquor_info.price;
      }

      let x = 0;
      for (x; x < this.customerCart.add_on.length; x += 1) {
        subTotal += this.customerCart.add_on[x].add_on_info.price;
      }

      return subTotal;
    },
    totalCost() {
      let total = this.subTotal;
      if (this.customerCart.promo_code) total += this.customerCart.promo_code.value;
      if (this.customerCart.delivery_method) total += this.customerCart.delivery_method.price;
      return total;
    },
  },
};
</script>
<style scoped>
/* Mobile View */
@media only screen and (min-width: 768px){
  .cart-section {
    min-height: 90vh;
    margin-top: 4rem;
  }
}
/* Tablet & Larger View */
@media only screen and (max-width: 768px){
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
  #btn-outer-layer {
    background: white;
    margin: 0px;
    width: 100%;
    position: sticky;
    bottom: 0px;
    z-index: 1;
  }
  #checkout-btn {
    width: 90%;
  }
}
/* Individual Product Table View */
#indv-orders-table {
  width: 100%;
}
.callTitlelize {
  padding: 0px!important;
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
  background-color: #222021!important;
  color: white!important;
  box-shadow: unset!important;
}

/* Order Summary Table */
.summary-label {
  text-align: left !important;
}
.summary-value {
  padding-left: 50px;
}
tr#total-value {
  border-top: 2.5px solid #e5e5e5;
  border-bottom: 2.5px solid #e5e5e5;
}
#last-component {
  padding-bottom: 1.1rem;
}
#checkout-btn {
  margin-top: 1.5rem;
  background-color: black;
  width: 220px;
}
</style>
