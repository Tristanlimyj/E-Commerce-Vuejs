<template>
  <div id="alert">
    <b-alert show :variant=typeAlert>{{ message }}</b-alert>
  </div>
</template>
<script>
export default {
  name: 'alert',
  props: ['message', 'typeAlert'],
};
</script>
<style scopped>
  #alert{
    text-align: center;
    font-weight: bold;
  }
</style>
