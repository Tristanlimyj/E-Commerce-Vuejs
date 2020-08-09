<template>
  <div id="User-Form">
    <b-container fluid>
      <b-col
        sm="12"
        md="12"
        offset-lg="4"
        lg="4"
        offset-xl="4"
        xl="4"
      >
        <h2>{{ pageGreeter }}</h2>
        <alert v-if="showMessage" :message="this.notification"></alert>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">

            <ValidationProvider rules="required|alpha" v-slot="{ errors }">
              <b-form-group
                id="username-group"
                label="Username:"
                label-for="username-input"
              >
              <b-form-input
                  id="username-input"
                  v-model="userForm.username"
                  type="text"
                  required
                  placeholder="Enter Username..."
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider name="main" rules="required" v-slot="{ errors }">
              <b-form-group
                id="password-group"
                label="Password:"
                label-for="password-input"
              >
              <b-form-input
                  id="password-input"
                  v-model="userForm.password"
                  type="password"
                  required
                  placeholder="Enter Password..."
                ></b-form-input>
              </b-form-group>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <div v-if="registrationForm">
              <ValidationProvider
                rules="required|passwordConfirmation:@main"
                v-slot="{ errors }"
              >
                <b-form-group
                  id="confirm-password-group"
                  label="Confirm Password:"
                  label-for="confirm-passwordinput"
                >
                  <b-form-input
                      id="confirm-password-input"
                      v-model="userFormpasswordConfirm"
                      type="password"
                      required
                      placeholder="Please confirm your password.."
                    ></b-form-input>
                  </b-form-group>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <b-button-group class="d-flex justify-content-center">
              <b-button
                type="submit" variant="primary">Submit</b-button>
            </b-button-group>
          </b-form>
        </ValidationObserver>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import Alert from './Alert.vue';

export default {
  props: ['pageGreeter', 'userForm', 'registrationForm', 'showMessage', 'notification'],
  components: {
    alert: Alert,
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit');
    },
  },
};
</script>
