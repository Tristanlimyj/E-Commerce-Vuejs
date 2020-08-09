<template>
  <div id="app">
    <div id="nav">
      <div class="nav-container container-fluid">
          <b-navbar
            v-if="this.$cookies.isKey('token') && this.$store.state.status === 'logged in'"
            class="header"
            variant="light"
            toggleable="md"
            :sticky=true
          >
            <b-navbar-brand>
              <h1><router-link to="/">Home</router-link></h1>
            </b-navbar-brand>

            <b-navbar-nav class="ml-auto">
              <b-navbar-toggle target="nav-collapse">
              </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <h1>
                  <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
                </h1>
                <h1>
                  <b-nav-item><router-link to="/contact">Contact</router-link></b-nav-item>
                </h1>
                <h1>
                  <b-nav-item><router-link to="/products">Products</router-link></b-nav-item>
                </h1>
                <h1>
                  <b-nav-item><router-link to="/cart">Cart</router-link></b-nav-item>
                </h1>
                <h1>
                  <b-nav-item
                    v-if="this.$cookies.isKey('token')
                    &&
                    this.$cookies.get('name') === this.$store.state.currentUser"
                    @click="logOut"
                  >
                    Log Out
                  </b-nav-item>
                </h1>
            </b-collapse>
            </b-navbar-nav>
          </b-navbar>
      </div>
    </div>
    <router-view/>
    <b-container
      v-if="this.$cookies.isKey('token') && this.$store.state.status === 'logged in'"
      class="footer"
      fluid
    >
      <b-jumbotron >
        <b-row>
          <b-col sm="6" md="6" lg="4" class="footer-com footer-mission">
            <u><h3>Business Name</h3></u>
            <p>
              We aim to be the most trusted
              and reliable alcohol delivery service
              in Singapore.</p>
          </b-col>
          <b-col sm="6" md="6" lg="4" class="footer-com footer-guid" size="3x">
            <u><h3>Guide</h3></u>
            <p>How to order on Telegram</p>
            <p>FAQs</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </b-col>
          <b-col sm="6" md="6" lg="4" class="footer-com footer-contact">
            <u><h3>Contact</h3></u>
            <p>Email</p>
            <p>Number</p>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-container {
  position: sticky;
  top: 0;
}

#nav {
  padding-top: 0.1vw;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  top: 0;
}

.navbar .sticky-top {
  position: fixed;
  overflow: visible;
  width: 100%;
  top: 0;
}

#nav a {
  font-weight: bold;
  font-size: 1em;
  color: #2c3e50;
}

#nav h1 {
  margin: 0px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.footer {
  padding-top: 5rem;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;
  color: #c8c8c8;
  background-color: white;
}

.footer-com {
  padding: 1vw, 0px, 1vw, 0px;
  text-align: center;
}
.jumbotron {
  background-color: #181818;
  margin-bottom: 0px;
}
</style>
