<template>
  <div id="payment-success">
    <b-container class="success" fluid>
      <b-row>
        <b-col
          class="order-information"
          xs="12"
          sm="12"
          offset-md="3"
          md="6"
          offset-lg="4"
          lg="4"
          offset-xl="4"
          xl="4"
        >
          <!--
          
          

          
          <div v-if="orderInfo.bundle && !error">
            
          </div>
          <h5 v-if="orderInfo.add_on.length !== 0 && !error">
            Add Ons Purchased:
          </h5>
          <div v-if="orderInfo.add_on.length !== 0 && !error">
            <ol class="purchased-add-ons" v-for="addOn in orderInfo.add_on" :key="addOn">
              <li>
                {{ callTitlelize(addOn) }}
              </li>
            </ol>
          </div>

          -->

          <i v-if="error" class="error-icon far fa-times-circle"> </i>
          <i v-else class="payment-icon far fa-check-circle"> </i>
          <br />
          <br />
          <h2>
            {{ this.paymentStatus }}
          </h2>
          <h5 v-if="!error">Order ID: {{ this.$cookies.get("cartId") }}</h5>
          <h5 v-if="!error">
            Purchased Items:
          </h5>
          <div>
            <ol class="bundles-ordered" v-for="bundle in orderInfo" :key="bundle.id">
              <li v-if="bundle.productData.isLiquor">
                {{ callTitlelize(bundle.productData.name) }} -
                {{ callTitlelize(bundle.productData.mixer.currentMixer.name) }}
              </li>
              <li v-else>Add-On: {{ callTitlelize(bundle.productData.name) }}</li>
            </ol>
          </div>
          <br />
          <h5 v-if="!error">Delivery: {{ callTitlelize(this.deliveryOption.name) }}</h5>
          <h5 v-if="!error">Total Value: ${{ totalCost }}</h5>
          <p>
            If you have any queries feel free to contact us at +65 91234567 or drop us a DM on
            Instagram
          </p>
          <br />
          <h5>
            You have reached the end of the mock up!!!
            <br />
          </h5>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from "axios";
import { stringFunctions as strfunction } from "../commonFunctions";

export default {
  data() {
    return {
      paymentStatus: "",
      orderInfo: {},
      deliveryOption: {},
      promoCode: {},
      error: false
    };
  },
  methods: {
    callTitlelize(sentence) {
      return strfunction.titlelize(sentence);
    },
    getDeliveryPrice(deliveryId) {
      Axios.get(`/delivery/${deliveryId}`).then(res => {
        this.deliveryOption = res.data.deliveryOption;
      });
    }
  },
  created() {
    let paramsCartId = "";
    if (this.$cookies.isKey("cartId")) {
      paramsCartId = this.$cookies.get("cartId");
    }

    Axios.post("/cart/paid", { cartId: paramsCartId })
      .then(res => {
        this.orderInfo = res.data.customerCart;
        this.deliveryOption = this.getDeliveryPrice(res.data.deliveryOptionId);
        this.promoCode = res.data.promoCode;
        this.paymentStatus = "Successfully Ordered";
      })
      .catch(err => {
        this.paymentStatus = "Error in Payment";
        this.error = true;
      });
  },
  computed: {
    totalCost() {
      let total = 0;
      for (let i = 0; i < this.orderInfo.length; i++) {
        total += this.orderInfo[i].productData.price;
      }

      if (this.deliveryOption) total += this.deliveryOption.price;

      if (Object.keys(this.promoCode).length !== 0) total -= this.promoCode.value;
      return total;
    }
  }
};
</script>

<style scoped>
.success {
  padding-top: 4vh;
  text-align: center;
  min-height: 80vh;
}
.bundles-ordered {
  list-style-type: none;
}
.payment-icon {
  color: #4bb543;
  font-size: 5rem;
}
.error-icon {
  color: #ff0033;
  font-size: 5rem;
}
.purchased-add-ons {
  padding: 0px;
}
</style>
