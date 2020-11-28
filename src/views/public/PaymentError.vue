<template>
  <div id="payment-success">
    <b-container class="error" fluid>
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
            class="error-icon far fa-times-circle">
          </i>
          <br>
          <br>
          <h2>
            Payment Error
          </h2>
          <br>
          <p>
            Please try again or contact
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
};
</script>

<style scoped>
.error {
  padding-top: 4vh;
  text-align: center;
  min-height: 80vh;
}
.error-icon {
  color: #ff0033;
  font-size: 5rem;
}
</style>
