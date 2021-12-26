<template>
  <div class="checkout">
    <b-container id="form-containter" fluid>
      <b-row>
        <b-col
          id="payment-form"
          xs="12"
          sm="12"
          offset-md="3"
          md="6"
          offset-lg="4"
          lg="4"
          offset-xl="4"
          xl="4"
        >
          <h3>Payment Form</h3>
          <ValidationObserver v-slot="{ valid }">
            <b-form-group id="name-input-group" label="Name:" label-for="name-input">
              <ValidationProvider rules="required" v-slot="{ errors }">
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
              <ValidationProvider rules="required|handphoneNumber" v-slot="{ errors }">
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
            <b-form-group id="address-input-group" label="Address:" label-for="Address-input">
              <ValidationProvider rules="required" v-slot="{ errors }">
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
            <b-form-group id="postal-group" label="Postal Code:" label-for="postal-input">
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
            <div class="payment-btn-wrapper">
              <b-button
                class="payment-btn"
                type="submit"
                :disabled="!valid"
                @click.prevent="onSubmit"
                pill
              >
                Pay {{ totalCost }}
              </b-button>
            </div>
          </ValidationObserver>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      customerForm: {
        name: "",
        contactNumber: "",
        address: "",
        postal: ""
      },
      customerCart: {},
      deliveryInfo: {},
      disable: false,
      promoCode: {}
    };
  },
  methods: {
    getDeliveryInfo(deliveryId) {
      const reqUrl = "/delivery/".concat(deliveryId);
      Axios.get(reqUrl).then(res => {
        const returnedData = res.data;
        this.deliveryInfo = returnedData.deliveryOption;
      });
    },
    onSubmit() {
      let paramsCartId = "";
      if (this.$cookies.isKey("cartId")) {
        paramsCartId = this.$cookies.get("cartId");
      }

      Axios.post("/cart/payment", { cartId: paramsCartId }).then(res => {
        this.$router.push({ name: "PaymentSuccess" });
      });
    }
  },
  created() {
    let paramsCartId = "";
    if (this.$cookies.isKey("cartId")) {
      paramsCartId = this.$cookies.get("cartId");
    } else {
      paramsCartId = false;
    }
    Axios.post("/cart", { cartId: paramsCartId })
      .then(res => {
        const returnedData = res.data;

        this.customerCart = returnedData.customerCart;
        this.promoCode = returnedData.promoCode;
        this.deliveryOptionId = this.getDeliveryInfo(returnedData.deliveryOptionId);
      })
      .catch(() => {
        this.$router.push({ name: "Cart" });
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

      if (this.promoCode.value) total -= this.promoCode.value;
      if (this.deliveryOptionId) total += this.deliveryInfo.price;

      return total;
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
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
.payment-btn {
  width: 95%;
  height: 3rem;
  background-color: black;
}
.payment-btn-wrapper {
  text-align: center;
}
</style>
