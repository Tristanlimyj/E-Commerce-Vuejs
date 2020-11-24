<template>
    <div class="edit-add-on">
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
                  v-model="add_on.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Price:"
                label-for="price-input"
              >
                <b-form-input
                  id="price-input"
                  v-model="add_on.price"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Category:"
                label-for="category-input"
              >
                <b-form-input
                  id="category-input"
                  v-model="add_on.category"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-file
                @change="changeImage"
                v-model="add_on.coverphoto"
              >
              </b-form-file>
              <div>
                Selected File:
                <a
                  v-if="noChange"
                  target="_blank"
                  :href="$store.state.apiurl + '/images/' + add_on.coverphoto"
                >
                  {{ this.add_on.coverphoto }}
                </a>
                <a
                  v-else
                  target="_blank"
                  :href="previewImage"
                >
                  {{ this.add_on.coverphoto.name }}
                </a>
              </div>
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
      add_on: {},
      noChange: true,
      previewImage: '',
      // Notifications
      showAlert: false,
      message: '',
      typeAlert: '',
    };
  },
  methods: {
    changeImage(e) {
      const file = e.target.files[0];
      this.add_on.coverphoto = file;
      const coverphotoURl = URL.createObjectURL(file);
      this.previewImage = coverphotoURl;
      this.noChange = false;
    },
    showMessage(message, typeAlert) {
      this.typeAlert = typeAlert;
      this.message = message;
      this.showAlert = true;
    },
    onSubmit() {
      const payload = new FormData();
      payload.append('name', this.add_on.name);
      payload.append('category', this.add_on.category);
      payload.append('price', this.add_on.price);
      payload.append('public_id', this.add_on.public_id);
      if (!this.noChange) {
        payload.append('coverphoto', this.add_on.coverphoto, this.add_on.coverphoto.name);
      }

      Axios.post('add-on/update_addon', payload, {
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
    Axios.get('add-on/indv_add_on/'.concat(this.$route.params.name))
      .then((res) => {
        this.add_on = res.data.indv_add_on;
      });
  },
};
</script>

<style>

</style>
