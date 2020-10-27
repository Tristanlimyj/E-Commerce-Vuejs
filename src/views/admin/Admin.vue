<template>
  <div class="admin">
    <b-container fluid>
      <AdminNav/>
      <b-row>
        <b-col xs="12" sm="12" md="12" lg="12">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
};
</script>
