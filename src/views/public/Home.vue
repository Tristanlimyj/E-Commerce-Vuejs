<template>
  <div class="Home">
    <b-container class='nav-bar' fluid>
      <PublicNav/>
    </b-container>
    <b-container class="home-page" fluid>
      <b-row id="key-selling-points">
        <b-col
          xs="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <h2>Convience</h2>
          <p>
            We provide you with the alcohol, mixer, ice and cups.
            All you have to do is order from us and we will do the rest.
          </p>
        </b-col>
        <b-col
          xs="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <h2>Flexible Delivery Options</h2>
          <p>
            We have many delivery options for you to choose from to cater to your every need.
          </p>
        </b-col>
        <b-col
          xs="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <h2>Operating Hours</h2>
          <p>
            We deliver from 5 PM - 3 AM everyday just so that you can get your alcohol.
          </p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="footer-container" fluid>
      <PublicFooter/>
    </b-container>
  </div>
</template>
<script>
import PublicNav from '../../components/PublicNav.vue';
import PublicFooter from '../../components/PublicFooter.vue';

export default {
  components: {
    PublicNav,
    PublicFooter,
  },
};
</script>
<style scoped>
  .home-page {
    text-align: center;
  }
</style>
