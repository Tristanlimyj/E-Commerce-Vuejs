<template>
  <div id="payment-success">
    <b-container class="success" fluid>
      <b-row>
        <b-col
          class="order-information"
          xs='12'
          sm='12'
          offset-md='3'
          md='6'
          offset-lg='4'
          lg='4'
          offset-xl='4'
          xl='4'
        >
          <i
            v-if="error"
            class="error-icon far fa-times-circle">
          </i>
          <i
            v-else
            class="payment-icon far fa-check-circle">
          </i>
          <br>
          <br>
          <h2>
            {{ this.paymentStatus }}
          </h2>

          <h5 v-if="!error" >
            Order ID: {{ this.orderInfo.public_id }}
          </h5>
          <h5 v-if="!error">
            Bundles Purchased:
          </h5>
            <div
              v-if="orderInfo.bundle && !error"
            >
              <ol
                class="bundles-ordered"
                v-for="bundle in orderInfo.bundle"
                :key="bundle"
              >
                <li>
                  {{ callTitlelize(bundle.liquor) }} - {{ callTitlelize(bundle.mixer) }}
                </li>
              </ol>
            </div>
          <h5 v-if="orderInfo.add_on.length !== 0 && !error">
            Add Ons Purchased:
          </h5>
            <div
              v-if="orderInfo.add_on.length !== 0 && !error"
            >
              <ol
                class="purchased-add-ons"
                v-for="addOn in orderInfo.add_on"
                :key="addOn"
              >
                <li>
                  {{ callTitlelize(addOn) }}
                </li>
              </ol>
            </div>
          <h5 v-if="!error">
            Delivery: {{ callTitlelize(this.orderInfo.delivery_type) }}
          </h5>
          <h5 v-if="!error">
            Total Value: ${{ this.orderInfo.value }}
          </h5>
          <br>
          <p>
            If you have any queries feel free to contact
            us at +65 81730458 or drop us a DM on
            Instagram
            <a href="https://www.instagram.com/thealchemistalcohol_/">
              @thealchemistalcohol_
            </a>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from 'axios';
import { stringFunctions as strfunction } from '../../commonFunctions';

export default {
  data() {
    return {
      paymentStatus: '',
      orderInfo: {},
      error: false,
    };
  },
  methods: {
    callTitlelize(sentence) {
      return strfunction.titlelize(sentence);
    },
  },
  created() {
    Axios.get(`order/details/${this.$route.params.orderId}`)
      .then((res) => {
        this.orderInfo = res.data.order_info;
        this.paymentStatus = res.data.message;
      })
      .catch((err) => {
        this.paymentStatus = err.response.data.message;
        this.error = true;
      });
  },
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
  color: #4BB543;
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
