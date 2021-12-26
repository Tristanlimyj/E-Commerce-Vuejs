<template>
  <router-link :to="link + name.replace(/\s/g, '-')">
    <b-card :img-src="`products/${coverphoto}`" :title="titlelize(name)">
      <b-card-text> Price: ${{ price }} </b-card-text>
      <template #footer>
        <b-button class="add-to-cart-btn" pill>Purchase</b-button>
      </template>
    </b-card>
  </router-link>
</template>

<script>
export default {
  props: ["link", "coverphoto", "price", "name", "titlelize"]
};
</script>

<style scoped>
.card-title {
  font-size: 1rem;
  height: 6vh;
  color: black !important;
}
a:hover {
  text-decoration: none !important;
}
.card {
  border: none;
}
.card-body {
  padding: 0px;
  padding-top: 1rem;
  text-align: center;
}
.card-text {
  color: black;
  margin-bottom: 1vh;
}
.card-footer {
  padding: 0px !important;
  text-align: center;
  background-color: transparent;
  border-top: none;
  padding-bottom: 3vh !important;
}
.add-to-cart-btn {
  background-color: black;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
</style>
