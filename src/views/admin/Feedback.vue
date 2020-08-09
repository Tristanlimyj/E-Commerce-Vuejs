<template>
  <div class="contact">
    <h1>Customer Feedback</h1>
    <b-table striped hover :fields='fields' :items="Object.values(this.feedback)">
    </b-table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      fields: [
        'name',
        'email',
        'number',
        {
          key: 'time_created',
          sortable: true,
        },
        {
          key: 'date_created',
          sortable: true,
        },
      ],
      feedback: [],
    };
  },
  methods: {
  },
  created() {
    axios.get('feedback', {
      headers: {
        'x-access-token': this.$cookies.get('token'),
      },
    })
      .then((response) => {
        this.feedback = response.data;
      });
  },
};
</script>
