<template>
  <div id="payment-success">
    <b-container class="error-page" fluid>
      <b-row>
        <b-col
          class="order-information"
          xs='12'
          sm='12'
          offset-md='3'
          md='6'
          offset-lg='4'
          lg='4'
          offset-xl='4'
          xl='4'
        >
          <i
            class="error-icon far fa-times-circle">
          </i>
          <br>
          <br>
          <h1>
            Error 404
          </h1>
          <h4>
            The page you are looking for does not exist.
          </h4>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
</script>

<style scoped>
.error-page {
  padding-top: 4vh;
  text-align: center;
  min-height: 80vh;
}
.error-icon {
  color: #ff0033;
  font-size: 5rem;
}
</style>
