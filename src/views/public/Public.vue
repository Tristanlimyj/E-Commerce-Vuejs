<template>
  <div class="Home">
    <AgeVerification
      :show="show"
      @legal="show = $event"
    />
    <div>
      <b-container class='nav-bar' fluid>
        <PublicNav/>
      </b-container>
      <router-view/>
      <b-container class="footer-container" fluid>
        <PublicFooter/>
      </b-container>
    </div>
  </div>
</template>

<script>
import PublicNav from '../../components/PublicNav.vue';
import PublicFooter from '../../components/PublicFooter.vue';
import AgeVerification from '../../components/AgeVerification.vue';

export default {
  components: {
    PublicNav,
    PublicFooter,
    AgeVerification,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    showAgeVerification() {
      this.show = true;
    },
  },
  created() {
    if (this.$cookies.isKey('ofDrinkingAge')) {
      if (this.$cookies.get('ofDrinkingAge')) {
        this.show = false;
      }
    } else {
      this.$cookies.set('ofDrinkingAge', false, '1d');
    }
  },
};
</script>
<style scoped>
.nav-bar {
  padding: 0px!important;
}
.footer-container {
  padding: 0px!important;
}
</style>
