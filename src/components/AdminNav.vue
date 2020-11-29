<template>
  <div id="nav">
    <div class="nav-container container-fluid">
        <b-navbar
          class="header"
          variant="light"
          toggleable="md"
          :sticky=true
        >
          <b-navbar-nav class="ml-auto">
            <b-navbar-toggle target="nav-collapse">
            </b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
              <h2>
                  <b-nav-item>
                    <router-link to="/admin/link-directory">
                      Link Directory
                    </router-link>
                  </b-nav-item>
              </h2>
              <h2>
                <b-nav-item>
                  <router-link to="/admin/promo-code">
                    Promo Code
                  </router-link>
                </b-nav-item>
              </h2>
                   <h2>
                <b-nav-item>
                  <router-link to="/admin/delivery-options">
                    Delivery Options
                  </router-link>
                </b-nav-item>
              </h2>
              <h2>
                <b-nav-item>
                  <router-link to="/admin/dashboard">
                    Products
                  </router-link>
                </b-nav-item>
              </h2>
              <h2>
                <b-nav-item>
                  <router-link to="/admin/mixer">
                    Mixer
                  </router-link>
                </b-nav-item>
              </h2>
              <h2>
                <b-nav-item>
                  <router-link to="/admin/addon">
                    Add On
                  </router-link>
                </b-nav-item>
              </h2>
              <h2>
                <b-nav-item
                  @click="logOut"
                >
                  Log Out
                </b-nav-item>
              </h2>
          </b-collapse>
          </b-navbar-nav>
        </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logoutUser');
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
<style scoped>
</style>
