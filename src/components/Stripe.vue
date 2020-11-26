<template>
  <div class="stripe">
    <StripeElements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="totalCost"
      locale="en"
      @token="tokenCreated"
      @loading="loading = $event"
    />
    <div class="payment-btn-wrapper">
      <!-- Show When Loading -->
       <b-button
        type='submit'
        class="payment-btn"
        v-if="formComplete && disable"
        pill
        disabled
      >
        <b-spinner
          label='Loading...'
          variant="light"
        />
      </b-button>
      <!-- Show when form is completed-->
      <b-button
        type='submit'
        class="payment-btn"
        @click="disable=true"
        v-if="!disable && formComplete"
        pill
      >
        Pay ${{ this.totalCost }}
      </b-button>
      <!-- When the form is still incomplete-->
      <b-button
        type='submit'
        class="payment-btn"
        pill
        v-if="!formComplete && totalCost"
        disabled
      >
        Pay ${{ this.totalCost }}
      </b-button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { StripeElements } from 'vue-stripe-checkout';

export default {
  components: {
    StripeElements,
  },
  props: [
    'formComplete',
    'totalCost',
    'orderDetails',
  ],
  data: () => ({
    disable: false,
    loading: false,
    publishableKey: `${process.env.VUE_APP_STRIPE_PUBLIC_KEY}`,
    paymentIntent: '',
  }),
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      this.$emit('disableForm');
      const charge = {
        paymentIntent: this.paymentIntent,
        source: token.id,
        cartId: this.$cookies.get('cartId'),
        orderDetails: this.orderDetails,
      };
      this.sendTokenToServer(charge);
    },
    sendTokenToServer(charge) {
      Axios.post('cart/payment', charge)
        .then((res) => {
          this.$cookies.remove('cartId');
          this.$router.push({
            name: 'PaymentSuccess',
            params: {
              orderId: res.data.order_id,
            },
          });
        })
        .catch(() => {
          this.$cookies.remove('cartId');
          this.$router.push({
            name: 'PaymentError',
          });
        });
    },
  },
  created() {
    Axios.post('cart/create-payment-intent', { cartId: this.$cookies.get('cartId') })
      .then((res) => {
        this.paymentIntent = res.data.clientSecret;
      });
  },
};
</script>
<style scoped>
  .payment-btn {
    width: 95%;
    height: 3rem;
    background-color: black;
  }
  .payment-btn-wrapper {
    text-align: center;
  }
</style>
