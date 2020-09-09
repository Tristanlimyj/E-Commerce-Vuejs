<template>
  <div class="indv-pro">
    <b-container fluid>
      <b-row
        class="individual-product"
        v-for="(info, index) in product" :key="index"
      >
        <b-col
        sm="12"
        md="12"
        lg="4"
        offset-lg="2"
        xl="4"
        offset-xl="2"
        >
          <img :src="base + '/images/' + info.coverphoto">
        </b-col >
        <b-col
        sm='12'
        md='12'
        lg='4'
        xl='4'
        >
          <h2>{{ info.name }}</h2>
          <h3><strong>${{ info.price }}</strong></h3>

          <b-form @submit="onSubmit">
            <!-- Quantity -->
            <h1>Ensure minimum is one</h1>
            <b-form-group
              id="quantity"
              label="Quantity:"
              label-for="input-1"
            >
              <b-form-input
                id="quantity"
                v-model="cartForm.quantity"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Add to Cart</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      base: this.$store.state.apiurl,
      product: {},
      cartForm: {
        quantity: 1,
        ice: true,
        cups: true,
        mixer: [],
      },
    };
  },
  methods: {
    mixerFunc(mix) {
      let i = 0;
      for (i; i < mix.length; i += 1) {
        this.cartForm.mixer.push(this.product[0].mixer[mix[i]]);
      }
    },
    onSubmit() {

    },
  },
  created() {
    let productUrl = '/indv_product/';
    productUrl += this.$route.params.name;

    axios.get(productUrl, {
      headers: { 'x-access-token': this.$cookies.get('token') },
    })
      .then((response) => {
        this.product = Object.values(response.data);

        const mix = Object.keys(this.product[0].mixer);
        this.mixerFunc(mix);
      });
  },
};
</script>
<style scoped>
img {
  width: 25rem;
  height: 25rem;
}
</style>
