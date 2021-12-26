<template>
  <div>
    <h2 class="product-name">
      {{ callTitlelize(this.productName) }}
    </h2>
    <h5 class="product-price"><strong>Price:</strong> ${{ this.productPrice }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    productName: String,
    productPrice: Number,
    callTitlelize: Function
  }
};
</script>
<style scoped></style>
