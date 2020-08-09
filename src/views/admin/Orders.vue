<template>
  <div class="contact">
    <h1>Customer Orders</h1>
    <b-table striped hover :fields='fields' :items="Object.values(this.orders)">
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
          key: 'public_id',
          sortable: true,
        },
        {
          key: 'mixer',
          sortable: true,
        },
        {
          key: 'alcohol',
          sortable: true,
        },
        {
          key: 'customer_tele_id',
          sortable: true,
        },
        {
          key: 'customer_name',
          sortable: true,
        },
        {
          key: 'customer_address',
          sortable: true,
        },
        {
          key: 'customer_postal',
          sortable: true,
        },
        {
          key: 'delivery_type',
          sortable: true,
        },
        {
          key: 'order_value',
          sortable: true,
        },
        {
          key: 'payment_status',
          sortable: true,
        },
        {
          key: 'received_status',
          sortable: true,
        },
        {
          key: 'date_time_created',
          sortable: true,
        },
      ],
      orders: {},
    };
  },
  methods: {
  },
  created() {
    axios.get('orders', {
      headers: {
        'x-access-token': this.$cookies.get('token'),
      },
    })
      .then((response) => {
        this.orders = response.data;
      });
  },
};
</script>
