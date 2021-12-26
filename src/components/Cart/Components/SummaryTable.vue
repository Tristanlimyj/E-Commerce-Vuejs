<template>
  <table>
    <TableRow label="Subtotal" :emptyCart="emptyCart" :subTotal="subTotal" />
    <TableRow
      :label="`Delivery <br /> (${deliveryType})`"
      :emptyCart="emptyCart"
      :subTotal="deliveryPrice"
    />
    <TableRow
      :label="`Promo Code <br /> (${promoCode})`"
      :labelId="`last-component`"
      :emptyCart="emptyCart"
      :subTotal="promoCodeValue"
    />
    <TableRow :trId="`total-value`" label="Total" :emptyCart="emptyCart" :subTotal="totalCost" />
  </table>
</template>

<script>
import TableRow from "./TableRow.vue";

export default {
  components: {
    TableRow
  },
  props: [
    "subTotal",
    "totalCost",
    "emptyCart",
    "deliveryType",
    "deliveryPrice",
    "promoCode",
    "promoCodeValue"
  ]
};
</script>
