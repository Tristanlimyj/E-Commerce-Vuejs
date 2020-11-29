<template>
  <div class="Link-Directory">
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
    <div class="link-head container-fluid row">
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
        <h1>Link Directory</h1>
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='2'
        lg='2'
        xl='2'
      >
        <b-button v-b-modal.add-link> Add Link </b-button>
        <b-modal id="add-link" title="Add Link">
            <form ref="form" @submit.prevent="onSubmit">
              <b-form-group
                label="Name:"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="linkForm.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="URL:"
                label-for="url-input"
              >
                <b-form-input
                  id="url-input"
                  v-model="linkForm.url"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
            <template v-slot:modal-footer>
              <b-button @click="onSubmit()"> Add Link </b-button>
            </template>
        </b-modal>
      </b-col>
    </div>
    <div class="link-body container-fluid row">
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
        <b-table striped hover :items="allLinks" :fields="fields">
          <template #cell(name)="data">
            {{ callTitlelize(data.value) }}
          </template>
          <template #cell(url)="data">
            {{ data.value }}
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
          key: 'name',
          sortable: true,
        },
        {
          key: 'url',
          sortable: true,
        },
        {
          key: 'public_id',
        },
      ],
      // Add Delivery Option Form
      linkForm: {
        name: '',
        url: '',
      },
      // Delivery Options
      allLinks: [],
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
      payload.append('name', this.linkForm.name);
      payload.append('url', this.linkForm.url);
      this.createDeliveryOption(payload);
    },
    createDeliveryOption(payload) {
      axios.post('/link-directory/new_link', payload, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((res) => {
          this.$bvModal.hide('add-link');
          this.initForm();
          this.updateDirectory();
          this.showMessage(res.data.message);
        })
        .catch((err) => {
          this.showMessage(err.response.data.message);
        });
    },
    // Deleting a Add On
    deleteDeliveryOption(publicId) {
      axios.delete(`link-directory/remove_link/${publicId}`, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then((res) => {
          this.updateDirectory();
          this.showMessage(res.data.message);
        })
        .catch((err) => {
          this.updateDirectory();
          this.showMessage(err.response.data.message);
        });
    },
    // Refreshing Data
    updateDirectory() {
      axios.get('link-directory')
        .then((response) => {
          this.allLinks = response.data.link_directory;
        });
    },
    initForm() {
      this.linkForm.name = '';
      this.linkForm.url = '';
    },
  },
  // Functions to run when created
  created() {
    this.updateDirectory();
  },
};
</script>
<style scoped>
  .action-btns {
    margin: 0.2rem;
  }
</style>
