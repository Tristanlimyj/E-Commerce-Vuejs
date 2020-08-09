<template>
  <div class="contact">
    <h1>Customer Inventory</h1>
    <b-table striped hover :fields='fields' :items="Object.values(this.inventory)">
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
          key: 'product',
          sortable: true,
        },
        {
          key: 'inventory',
          sortable: true,
        },
        {
          key: 'type_alcohol',
          sortable: true,
        },
      ],
      inventory: {},
    };
  },
  methods: {
  },
  created() {
    axios.get('inventory', {
      headers: {
        'x-access-token': this.$cookies.get('token'),
      },
    })
      .then((response) => {
        this.inventory = response.data;
      });
  },
};
</script>
