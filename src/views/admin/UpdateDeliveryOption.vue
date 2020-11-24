<template>
    <div class="edit-delivery-option">
      <b-container fluid>
        <b-row>
          <b-col
            xs='12'
            sm='12'
            offset-md='4'
            md='4'
            offset-lg='4'
            lg='4'
            offset-xl='4'
            xl='4'
          >
            <Alert
              v-if="showAlert"
              :message=message
              :typeAlert=typeAlert
            />
          </b-col>
          <b-col
            xs='12'
            sm='12'
            offset-md='4'
            md='4'
            offset-lg='4'
            lg='4'
            offset-xl='4'
            xl='4'
          >
            <form ref="form" @submit.prevent="onSubmit">
              <b-form-group
                label="Name:"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="deliveryOption.delivery_type"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Price:"
                label-for="price-input"
              >
                <b-form-input
                  id="price-input"
                  v-model="deliveryOption.price"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Start Time:"
                label-for="start-time-input"
              >
                <b-form-input
                  id="start-time-input"
                  v-model="deliveryOption.start_time"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="End Time:"
                label-for="end-time-input"
              >
                <b-form-input
                  id="end-time-input"
                  v-model="deliveryOption.end_time"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
            <b-button @click="onSubmit()"> Update </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import Axios from 'axios';
import Alert from '../../components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      deliveryOption: {},
      // Notifications
      showAlert: false,
      message: '',
      typeAlert: '',
    };
  },
  methods: {
    showMessage(message, typeAlert) {
      this.typeAlert = typeAlert;
      this.message = message;
      this.showAlert = true;
    },
    onSubmit() {
      const payload = new FormData();
      payload.append('delivery_type', this.deliveryOption.delivery_type);
      payload.append('price', this.deliveryOption.price);
      payload.append('start_time', this.deliveryOption.start_time);
      payload.append('end_time', this.deliveryOption.end_time);
      payload.append('public_id', this.deliveryOption.public_id);

      Axios.post('delivery/update-delivery-option', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((res) => {
          this.showMessage(res.data.message, 'primary');
        })
        .catch((err) => {
          this.showMessage(err.response.data.message, 'danger');
        });
    },
  },
  created() {
    Axios.get(`delivery/${this.$route.params.publicId}`)
      .then((res) => {
        this.deliveryOption = res.data.deliveryOptionInfo;
      });
  },
};
</script>

<style>

</style>
