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
   margin: 0px;
   width: 100%;
   position: sticky;
   top: 0px;
   z-index: 1;
 }
.footer-container {
    position: static;
    width: 100%;
    padding: 2rem 0px 1rem;
    bottom: 0;
    padding-bottom: 0;
  }

</style>
