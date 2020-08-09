<template>
  <div id="Registration-Page">
    <userForm
      @onSubmit="onSubmit"
      pageGreeter="Hello! Welcome to the Registration Page!"
      :userForm="userForm"
      registrationForm="true"
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
        passwordConfirm: '',
      },
      showMessage: false,
      notification: '',
    };
  },
  methods: {
    createAcc(payload) {
      axios.post('user_registration', payload, {
        headers: { 'x-access-token': this.$cookies.get('token') },
      })
        .then(() => {
          this.showMessage = true;
          this.notification = 'Registration Successful';
          this.initForm();
        })
        .catch(() => {
          this.showMessage = true;
          this.notification = 'Registration Unsuccessful';
        });
    },
    initForm() {
      this.userForm.username = '';
      this.userForm.password = '';
      this.userForm.passwordConfirm = '';
    },
    onSubmit() {
      const payload = {
        username: this.userForm.username,
        password: this.userForm.password,
      };
      this.createAcc(payload);
    },
  },
};
</script>
