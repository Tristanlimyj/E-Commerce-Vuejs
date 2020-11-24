<template>
  <div class="Add-On">
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
        <alert v-if="showMessage" :message="this.notification"></alert>
      </b-col>
    </b-row>
    <div class="mix-head container-fluid row">
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
        <h1>Add On</h1>
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='2'
        lg='2'
        xl='2'
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
              <b-form-file
                @change="changeImage"
                v-model="addAddOnForm.file"
              >
              </b-form-file>
              <div>
                Selected File:
                <a
                  v-if="Boolean(this.addAddOnForm.file)"
                  target="_blank"
                  :href="imagePreview"
                >
                  {{ this.addAddOnForm.file.name }}
                </a>
              </div>
            </form>
            <template v-slot:modal-footer>
              <b-button @click="onSubmit()"> Add Add-On </b-button>
            </template>
        </b-modal>
      </b-col>
    </div>
    <div class="mix-body container-fluid row">
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
        <b-table striped hover :items="addOn" :fields="fields">
          <template #cell(coverphoto)="data">
            <b-img
              class="add-on-image"
              :src="$store.state.apiurl + '/images/' + data.item.coverphoto"
            />
          </template>
          <template #cell(name)="data">
            {{ callTitlelize(data.value) }}
          </template>
          <template #cell(price)="data">
            ${{ data.value }}
          </template>
          <template #cell(category)="data">
            {{ callTitlelize(data.value) }}
          </template>
          <template #cell(public_id)="data">
            <b-button
              class="action-btns"
              variant="danger"
              size="md"
              @click="deleteAddOn(data.value)"
            >
              Delete
            </b-button>
            <b-button
              class="action-btns"
              variant="warning"
              size="md"
              @click="updatedAddOn(data.item.name)"
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
          key: 'coverphoto',
          label: 'Image',
        },
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
          label: 'Actions',
        },
      ],
      // Add Add On Form
      addAddOnForm: {
        name: '',
        price: 0,
        category: '',
        file: null,
      },
      // Preview Information
      imagePreview: '',
      // Add On
      addOn: [],
      // notification //
      showMessage: false,
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
    changeImage(e) {
      const file = e.target.files[0];
      this.addAddOnForm.file = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    // Creating a new Add On
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.addAddOnForm.name);
      payload.append('price', this.addAddOnForm.price);
      payload.append('category', this.addAddOnForm.category);
      if (this.addAddOnForm.file) {
        payload.append('coverphoto', this.addAddOnForm.file, this.addAddOnForm.file.name);
      }
      this.createAddOn(payload);
    },
    createAddOn(payload) {
      axios.post('/add-on/new_addon', payload, {
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
    updatedAddOn(addOnName) {
      this.$router.push({ name: 'EditAddOn', params: { name: addOnName } });
    },
    // Deleting a Add On
    deleteAddOn(publicId) {
      axios.delete('add-on/remove_addon/'.concat(publicId), {
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
      axios.get('add-on')
        .then((response) => {
          this.addOn = response.data.add_on_info;
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
  .action-btns {
    margin: 0.2rem;
  }
  .add-on-image {
    max-width: 5vw;
  }
</style>
