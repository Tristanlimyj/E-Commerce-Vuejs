<template>
  <div class="Add-Products">
    <alert v-if="showMessage" :message="this.notification"></alert>
    <div class="mix-head container-fluid row">
      <b-col
        xs='12'
        sm='12'
        md='12'
        lg='9'
      >
        <h1>Add On</h1>
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='12'
        lg='3'
      >
        <b-button v-b-modal.add-add-on> Add Add-On </b-button>
        <b-modal id="add-add-on" title="Add Add-On">
            <form ref="form" @submit.prevent="onSubmit">
              <b-form-group
                label="Name:"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="addAddOnForm.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Price:"
                label-for="price-input"
              >
                <b-form-input
                  id="price-input"
                  v-model="addAddOnForm.price"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Category:"
                label-for="category-input"
              >
                <b-form-input
                  id="category-input"
                  v-model="addAddOnForm.category"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
            <template v-slot:modal-footer>
              <b-button @click="onSubmit()"> Add Add-On </b-button>
            </template>
        </b-modal>
      </b-col>
    </div>
    <div class="mix-body container-fluid row">
      <b-table striped hover :items="addOn" :fields="fields">
        <template v-slot:cell(public_id)="data">
          <b-button
            variant="danger"
            size="lg"
            @click="deleteAddOn(data.value)"
          >
            {{ 'remove '.concat(data.item.name).toUpperCase() }}
          </b-button>
        </template>
      </b-table>
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
      // Table Fields
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'price',
          sortable: true,
        },
        {
          key: 'category',
          sortable: true,
        },
        {
          key: 'public_id',
          label: 'Remove Add on',
        },
      ],
      // Add Add On Form
      addAddOnForm: {
        name: '',
        price: 0,
        category: '',
      },
      // Add On
      addOn: [],
      // notification //
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    // Creating a new Add On
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.addAddOnForm.name);
      payload.append('price', this.addAddOnForm.price);
      payload.append('category', this.addAddOnForm.category);
      this.createAddOn(payload);
    },
    createAddOn(payload) {
      axios.post('new_addon', payload, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.$bvModal.hide('add-add-on');
          this.initForm();
          this.updateAddOn();
          this.showMessage = true;
          this.notification = 'Add-On Created';
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Unsuccessful';
        });
    },
    // Deleting a Add On
    deleteAddOn(publicId) {
      axios.delete('remove_addon/'.concat(publicId), {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.updateAddOn();
          this.showMessage = true;
          this.notification = 'Add-On Deleted';
        })
        .catch(() => {
          this.updateAddOn();
          this.showMessage = true;
          this.notification = 'Unsuccesful';
        });
    },
    // Refreshing Data
    updateAddOn() {
      axios.get('all_addon')
        .then((response) => {
          const addOnReturn = [];
          Object.values(response.data).map((idv) => addOnReturn.push(idv));
          this.addOn = addOnReturn;
        });
    },
    initForm() {
      this.addAddOnForm.name = '';
      this.addAddOnForm.price = '';
      this.addAddOnForm.category = '';
    },
  },
  // Functions to run when created
  created() {
    this.updateAddOn();
  },
};
</script>
<style scoped>
</style>
