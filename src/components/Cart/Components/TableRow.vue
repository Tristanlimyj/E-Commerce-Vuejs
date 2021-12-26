<template>
  <tr :id="trId">
    <td :id="labelId" class="summary-label" v-html="label"></td>
    <td class="summary-value" v-if="subTotal">
      {{ subTotal }}
    </td>
    <td class="summary-value" v-else>-</td>
  </tr>
</template>

<script>
export default {
  props: ["label", "emptyCart", "subTotal", "trId", "labelId"]
};
</script>

<style scoped>
#last-component {
  padding-bottom: 1.1rem;
}
tr#total-value {
  border-top: 2.5px solid #e5e5e5;
  border-bottom: 2.5px solid #e5e5e5;
}
.summary-label {
  text-align: left !important;
}
.summary-value {
  padding-left: 50px;
}
</style>
