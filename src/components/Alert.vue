<template>
  <div id="alert">
    <b-alert show variant="primary">{{ message }}</b-alert>
  </div>
</template>
<script>
export default {
  name: 'alert',
  props: ['message'],
};
</script>
