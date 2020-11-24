<template>
  <div class="Delivery-Options">
    <b-row>
      <b-col
        xs='12'
        sm='12'
        offset-md='3'
        md='5'
        offset-lg='3'
        lg='5'
        offset-xl='3'
        xl='5'
      >
        <alert v-if="showAlert" :message="this.notification"></alert>
      </b-col>
    </b-row>
    <div class="options-head container-fluid row">
      <b-col
        xs='12'
        sm='12'
        offset-md='2'
        md='6'
        offset-lg='2'
        lg='6'
        offset-xl='2'
        xl='6'
      >
        <h1>Delivery Options</h1>
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='2'
        lg='2'
        xl='2'
      >
        <b-button v-b-modal.add-delivery-option> Add Delivery Options </b-button>
        <b-modal id="add-delivery-option" title="Add Delivery Option">
            <form ref="form" @submit.prevent="onSubmit">
              <b-form-group
                label="Name:"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="deliveryOptionsForm.delivery_type"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Price:"
                label-for="price-input"
              >
                <b-form-input
                  id="price-input"
                  v-model="deliveryOptionsForm.price"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Start Time:"
                label-for="start-time-input"
              >
                <b-form-input
                  id="start-time-input"
                  v-model="deliveryOptionsForm.start_time"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="End Time:"
                label-for="end-time-input"
              >
                <b-form-input
                  id="end-time-input"
                  v-model="deliveryOptionsForm.end_time"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
            <template v-slot:modal-footer>
              <b-button @click="onSubmit()"> Add Option </b-button>
            </template>
        </b-modal>
      </b-col>
    </div>
    <div class="delivery-options-body container-fluid row">
      <b-col
        xs='12'
        sm='12'
        offset-md='2'
        md='8'
        offset-lg='2'
        lg='8'
        offset-xl='2'
        xl='8'
      >
        <b-table striped hover :items="deliveryOptions" :fields="fields">
          <template #cell(delivery_type)="data">
            {{ callTitlelize(data.value) }}
          </template>
          <template #cell(price)="data">
            ${{ data.value }}
          </template>
          <template #cell(public_id)="data">
            <b-button
              class="action-btns"
              variant="danger"
              size="md"
              @click="deleteDeliveryOption(data.value)"
            >
              Delete
            </b-button>
            <b-button
              class="action-btns"
              variant="warning"
              size="md"
              @click="updateDeliveryOption(data.value)"
            >
              Update
            </b-button>
          </template>
        </b-table>
      </b-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../../components/Alert.vue';
import { stringFunctions as strfunction } from '../../commonFunctions';

export default {
  components: {
    alert: Alert,
  },
  data() {
    return {
      // Table Fields
      fields: [
        {
          key: 'delivery_type',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'price',
          sortable: true,
        },
        {
          key: 'start_time',
          sortable: true,
        },
        {
          key: 'end_time',
          sortable: true,
        },
        {
          key: 'public_id',
          label: 'Actions',
        },
      ],
      // Add Delivery Option Form
      deliveryOptionsForm: {
        delivery_type: '',
        price: 0,
        start_time: 0,
        end_time: 0,
      },
      // Delivery Options
      deliveryOptions: [],
      // notification //
      showAlert: false,
      notification: '',
    };
  },
  methods: {
    callTitlelize(sentence) {
      if (sentence) {
        return strfunction.titlelize(sentence);
      }
      return false;
    },
    showMessage(message) {
      this.showAlert = true;
      this.notification = message;
    },
    // Creating a new Delivery Option
    onSubmit() {
      const payload = new FormData();
      payload.append('delivery_type', this.deliveryOptionsForm.delivery_type);
      payload.append('price', this.deliveryOptionsForm.price);
      payload.append('start_time', this.deliveryOptionsForm.start_time);
      payload.append('end_time', this.deliveryOptionsForm.end_time);
      this.createDeliveryOption(payload);
    },
    createDeliveryOption(payload) {
      axios.post('/delivery/new-delivery-option', payload, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((res) => {
          this.$bvModal.hide('add-delivery-option');
          this.initForm();
          this.updateDeliveryOptions();
          this.showMessage(res.data.message);
        })
        .catch((err) => {
          this.showMessage(err.response.data.message);
        });
    },
    updateDeliveryOption(optionId) {
      this.$router.push({ name: 'UpdateDeliveryOption', params: { publicId: optionId } });
    },
    // Deleting a Add On
    deleteDeliveryOption(publicId) {
      axios.delete(`delivery/remove-delivery-option/${publicId}`, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((res) => {
          this.updateDeliveryOptions();
          this.showMessage(res.data.message);
        })
        .catch((err) => {
          this.updateDeliveryOptions();
          this.showMessage(err.response.data.message);
        });
    },
    // Refreshing Data
    updateDeliveryOptions() {
      axios.get('delivery/delivery-options')
        .then((response) => {
          this.deliveryOptions = response.data.delivery_options;
        });
    },
    initForm() {
      this.deliveryOptionsForm.delivery_type = '';
      this.deliveryOptionsForm.price = 0;
      this.deliveryOptionsForm.start_time = 0;
      this.deliveryOptionsForm.end_time = 0;
    },
  },
  // Functions to run when created
  created() {
    this.updateDeliveryOptions();
  },
};
</script>
<style scoped>
  .action-btns {
    margin: 0.2rem;
  }
</style>
