<template>
    <div id="promo-code">
      <div class="container-fluid">
        <b-row>
          <b-col
          sm='12'
          md='12'
          offset-lg="2"
          lg='2'
          offset-xl="2"
          xl='2'
          >
            <h2>Promo Codes</h2>
          </b-col>
          <b-col
            sm='12'
            md='12'
            lg='4'
            xl='4'
          >
            <alert v-if="showMessage" :message="this.notification" ></alert>
          </b-col>
          <b-col
            sm='12'
            md='12'
            lg='2'
            xl='2'
          >
            <b-button v-b-modal.add-promo-code>
              Add Promo Code
            </b-button>
            <b-modal id="add-promo-code" title="Add Promo Code">
              <form ref="form" @submit.prevent="addNewPromoCode">
                <b-form-group
                label="Value:"
                label-for="value-input"
              >
                <b-form-input
                  id="value-input"
                  v-model="addPromoCodeForm.value"
                  required
                ></b-form-input>
              </b-form-group>
                <b-form-group
                label="Max Use:"
                label-for="max-use-input"
              >
                <b-form-input
                  id="max-use-input"
                  v-model="addPromoCodeForm.max_use"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Expiry Date:"
                label-for="expiry-date-input"
              >
                <b-form-datepicker
                  id="expiry-date-input"
                  v-model="addPromoCodeForm.expiry_date"
                  required
                ></b-form-datepicker>
              </b-form-group>
              </form>
              <template v-slot:modal-footer>
              <b-button @click="addNewPromoCode()"> Create Promo Code </b-button>
            </template>
            </b-modal>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            sm='12'
            md='12'
            offset-lg="2"
            lg='8'
            offset-xl="2"
            xl='8'
          >
          <b-table striped hover :items="promoCodes" :fields="fields">
            <template v-slot:cell(removeCode)="data">
              <b-button
                variant="danger"
                size="md"
                @click="deletePromoCode(data.item.code)"
              >
                Delete Promo Code
              </b-button>
            </template>
          </b-table>
          </b-col>
        </b-row>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Alert from '../../components/Alert.vue';

export default {
  components: {
    alert: Alert,
  },
  data() {
    return {
      // Form Fields
      addPromoCodeForm: {
        value: 0,
        max_use: 1,
        expiry_date: '',
      },
      // Table Fields
      fields: [
        {
          key: 'code',
          sortable: true,
        },
        {
          key: 'value',
          sortable: true,
        },
        {
          key: 'number_times_used',
          sortable: true,
        },
        {
          key: 'max_use',
          sortable: true,
        },
        {
          key: 'expiry_date',
          sortable: true,
        },
        'removeCode',
      ],
      promoCodes: [],
      // Notification Field
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    // Get the updated Promo codes from the server
    updatedPromoCode() {
      axios.get('promo-codes/', {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((response) => {
          // So to ensure that it will not keep adding on to the list
          this.promoCodes = response.data.all_promo_codes;
        })
        .catch((error) => {
          this.viewMessage(error.response.data.message);
        });
    },
    // New Promo Code Form Related Methods
    initForm() {
      this.addPromoCodeForm.value = 0;
      this.addPromoCodeForm.max_use = 1;
      this.addPromoCodeForm.expiry_date = '';
    },
    addNewPromoCode() {
      const payload = new FormData();
      payload.append('value', this.addPromoCodeForm.value);
      payload.append('max_use', this.addPromoCodeForm.max_use);
      payload.append('expiry_date', this.addPromoCodeForm.expiry_date);

      const params = {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      };
      axios.post('promo-codes/new_promo_code', payload, params)
        .then((response) => {
          this.$bvModal.hide('add-promo-code');
          this.addNewlyCreatedCode(response.data.new_promo_code);
          this.initForm();
          this.viewMessage(response.data.message);
        })
        .catch((error) => {
          this.viewMessage(error.response.data.message);
        });
    },
    addNewlyCreatedCode(newPromoCode) {
      this.promoCodes.push(newPromoCode);
    },
    // Deletion of Promo Code
    deletePromoCode(codeId) {
      const deleteUrl = 'promo-codes/remove_promo_code/'.concat(codeId);
      const params = {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      };
      axios.delete(deleteUrl, params)
        .then((response) => {
          this.findNRemovePromoCode(response.data.promo_code_deleted);
          this.viewMessage(response.data.message);
        })
        .catch((error) => {
          this.viewMessage(error.response.data.message);
        });
    },
    findNRemovePromoCode(codeId) {
      for (let i = 0; i < this.promoCodes.length; i += 1) {
        if (this.promoCodes[i].code === codeId) {
          this.promoCodes = this.promoCodes.filter((indvCode) => this.promoCodes[i] !== indvCode);
          break;
        }
      }
    },
    // Show the Message
    viewMessage(message) {
      this.showMessage = true;
      this.notification = message;
    },
  },

  created() {
    this.updatedPromoCode();
  },
};
</script>
