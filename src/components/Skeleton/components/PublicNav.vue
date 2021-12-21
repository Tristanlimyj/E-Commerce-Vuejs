<template>
    <div id="public-nav">
      <div class="container-fluid inner-nav-container">
        <b-row>
          <b-col
            xs='12'
            sm='12'
            md='12'
            lg='12'
            xl='12'
          >
            <b-nav
            align="center"
          >
                <h6>
                  <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
                </h6>
                <h6>
                  <b-nav-item><router-link to="/products">Products</router-link></b-nav-item>
                </h6>
                <h6>
                  <b-nav-item><router-link to="/add-on">Add On</router-link></b-nav-item>
                </h6>
                <h6>
                  <b-nav-item><router-link to="/cart">Cart</router-link></b-nav-item>
                </h6>
          </b-nav>
          </b-col>
        </b-row>
      </div>
  </div>
</template>

<style scoped>
  #public-nav {
    padding-top: 0.4rem;
    border-top: solid;
    border-bottom: solid;
    border-width: 2.5px;
    border-color: #e5e5e5;
    background-color: white;
  }
  .inner-nav-container {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
    #public-nav a {
    color: #111;
    }

    #public-nav a.router-link-exact-active {
    font-weight: bold;
    border-bottom-style: solid;
    border-bottom-width: 0.2rem;
    padding-bottom: 1rem;

    }
    #public-nav a:hover {
      font-weight: bold;
      text-decoration: none;
    }
    .nav-link {
      font-size: 1rem;
    }
</style>
