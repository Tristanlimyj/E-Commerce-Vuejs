<template>
  <div class="contact">
    <h1>Customer Carts</h1>
    <b-table striped hover :fields='fields' :items="Object.values(this.carts)">
    </b-table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      fields: [
        {
          key: 'customer_id',
          sortable: true,
        },
        {
          key: 'item',
          sortable: true,
        },
        {
          key: 'mixer',
          sortable: true,
        },
        {
          key: 'paid',
          sortable: true,
        },
      ],
      carts: {},
    };
  },
  methods: {
  },
  created() {
    axios.get('tele_cart', {
      headers: {
        'x-access-token': this.$cookies.get('token'),
      },
    })
      .then((response) => {
        this.carts = response.data;
      });
  },
};
</script>
