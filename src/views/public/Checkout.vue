<template>
  <div class="checkout">
    <b-container class="nav-bar" fluid>
      <PublicNav/>
    </b-container>
    <b-container
      id="form-containter"
      fluid
    >
      <b-row>
        <b-col
          id="payment-form"
          xs='12'
          sm='12'
          offset-md='3'
          md='6'
          offset-lg='4'
          lg='4'
          offset-xl='4'
          xl='4'
        >
          <h3>Payment Form</h3>
          <ValidationObserver v-slot="{ valid }">
                  <b-form-group
                    id="name-input-group"
                    label="Name:"
                    label-for="name-input"
                  >
                  <ValidationProvider rules='required' v-slot="{ errors }">
                    <b-form-input
                      id="name-input"
                      v-model="customerForm.name"
                      placeholder="Name"
                      :disabled="disable"
                    ></b-form-input>
                  <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </b-form-group>
                  <b-form-group
                    id="contact-number-group"
                    label="Contact Number:"
                    label-for="contact-number-input"
                  >
                  <ValidationProvider rules='required|handphoneNumber' v-slot="{ errors }">
                    <b-form-input
                      id="contact-number-input"
                      :disabled="disable"
                      v-model="customerForm.contactNumber"
                      required
                      placeholder="Number"
                    ></b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </b-form-group>
                  <b-form-group
                    id="address-input-group"
                    label="Address:"
                    label-for="Address-input"
                  >
                  <ValidationProvider rules='required' v-slot="{ errors }">
                    <b-form-input
                      id="address-input"
                      :disabled="disable"
                      v-model="customerForm.address"
                      required
                      placeholder="Delivery Address"
                    ></b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </b-form-group>
                  <b-form-group
                    id="postal-group"
                    label="Postal Code:"
                    label-for="postal-input"
                  >
                  <ValidationProvider rules="postal|required" v-slot="{ errors }">
                    <b-form-input
                      :disabled="disable"
                      id="postal-input"
                      v-model="customerForm.postal"
                      placeholder="Postal Code"
                    ></b-form-input>
                    <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
                  </b-form-group>
              <h6>Card Details:</h6>
              <Stripe
                :formComplete="valid"
                :totalCost="totalCost"
                :orderDetails="customerForm"
                @disableForm="disable=true"
              />
          </ValidationObserver>
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
import Stripe from '../../components/Stripe.vue';
import PublicNav from '../../components/PublicNav.vue';
import PublicFooter from '../../components/PublicFooter.vue';

export default {
  components: {
    Stripe,
    PublicNav,
    PublicFooter,
  },
  data() {
    return {
      customerForm: {
        name: '',
        contactNumber: '',
        address: '',
        postal: '',
      },
      customerCart: {},
      disable: false,
    };
  },
  created() {
    let paramsCartId = '';
    if (this.$cookies.isKey('cartId')) {
      paramsCartId = this.$cookies.get('cartId');
    } else {
      paramsCartId = false;
    }
    Axios.post('cart/checkout', { cartId: paramsCartId })
      .then((res) => {
        const returnedData = res.data;
        if (
          returnedData.customer_cart.liquor.length === 0
          || !returnedData.customer_cart.delivery_method
        ) {
          this.$router.push({ name: 'Cart' });
        }
        this.customerCart = returnedData.customer_cart;
      })
      .catch(() => {
        this.$router.push({ name: 'Cart' });
      });
  },
  computed: {
    subTotal() {
      if (!this.customerCart.liquor) {
        return false;
      }
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
      if (!this.customerCart.liquor) {
        return 0;
      }
      if (this.customerCart.promo_code) {
        let total = this.subTotal;
        total += this.customerCart.delivery_method.price;
        total -= this.customerCart.promo_code.value;
        return total;
      }
      return this.subTotal + this.customerCart.delivery_method.price;
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px){
  table {
    text-align: center;
    min-width: 90vw;
  }
  #payment-form {
    margin: 2vh 4vw;
  }
}
  #payment-form {
    margin-top: 2vh;
    background-color: #f2f2f2;
    padding: 1.5rem 2rem 2rem 2rem !important;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
</style>
