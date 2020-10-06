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
        <h1>Mixers</h1>
      </b-col>
      <b-col
        xs='12'
        sm='12'
        md='12'
        lg='3'
      >
        <b-button v-b-modal.add-mixer> Add Mixer </b-button>
        <b-modal id="add-mixer" title="Add Mixer">
            <form ref="form" @submit.prevent="onSubmit">
              <b-form-group
                label="Name of Mixer"
                label-for="mix-input"
              >
                <b-form-input
                  id="mix-input"
                  v-model="addMixerForm.mix"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
            <template v-slot:modal-footer>
              <b-button @click="onSubmit()"> Add Mixer </b-button>
            </template>
        </b-modal>
      </b-col>
    </div>
    <div class="mix-body container-fluid row">
      <ol>
        <li v-for="mix in mixers" :key="mix.public_id">
          {{ mix.name }}
          <b-button
            @click="deleteMixer(mix.public_id)"
            pill
            size="sm"
            variant="danger">
              Remove Mixer
          </b-button>
        </li>
      </ol>
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
      addMixerForm: {
        mix: '',
      },
      // Mixers
      mixers: [],
      // notification //
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    // Creating a new mixer
    onSubmit() {
      const payload = new FormData();
      payload.append('mixer', this.addMixerForm.mix);
      this.createMix(payload);
    },
    createMix(payload) {
      axios.post('new_mixer', payload, {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.$bvModal.hide('add-mixer');
          this.initForm();
          this.updateMixers();
          this.showMessage = true;
          this.notification = 'Mixer Created';
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Unsuccessful';
        });
    },
    // Deleting a Mixer
    deleteMixer(publicId) {
      axios.delete('remove_mixer/'.concat(publicId), {
        headers: {
          'x-access-token': this.$cookies.get('token'),
        },
      })
        .then(() => {
          this.updateMixers();
          this.showMessage = true;
          this.notification = 'Mixer Deleted';
        })
        .catch(() => {
          this.updateMixers();
          this.showMessage = true;
          this.notification = 'Unsuccesful';
        });
    },
    // Refreshing Data
    updateMixers() {
      axios.get('all_mixers')
        .then((response) => {
          this.mixers = response.data;
        });
    },
    initForm() {
      this.addMixerForm.mix = '';
    },
  },
  // Functions to run when created
  created() {
    this.updateMixers();
  },
};
</script>
<style scoped>
</style>
