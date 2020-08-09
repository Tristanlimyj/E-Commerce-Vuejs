<template>
  <div id="Login-Page">
    <userForm
      @onSubmit="onSubmit"
      pageGreeter="Hello! Welcome to the login Page!"
      :userForm="userForm"
      :registrationForm="false"
      :showMessage="showMessage"
      :notification="notification"
    >
    </userForm>
  </div>
</template>

<script>
import axios from 'axios';
import UserForm from '../../components/UserForm.vue';

export default {
  components: {
    userForm: UserForm,
  },
  data() {
    return {
      userForm: {
        username: '',
        password: '',
      },
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    loginAttempt(payload) {
      axios.post('user_login', payload)
        .then((response) => {
          const token = String(response.data.token);

          this.$cookies.set('token', token, '15min');
          this.$store.dispatch('decodeToken', token);

          this.$router.push({ path: '/admin/dashboard' });
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Login attempt unsuccessful';
          this.userForm.password = '';
        });
    },
    onSubmit() {
      const payload = {
        username: this.userForm.username,
        password: this.userForm.password,
      };
      this.loginAttempt(payload);
    },
  },
};
</script>
