<template>
  <div>
    <h5 class="no-product" v-if="!loading">
      We are unable to find the what you were looking for:(
    </h5>
    <h5 class="no-product" v-if="loading">Loading...</h5>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>

<style scoped>
.no-product {
  text-align: center;
}
</style>
