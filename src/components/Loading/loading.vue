<template>
  <div class="loading">
    <v-progress-circular
      size="100"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  name: "Loading",
};
</script>
<style scoped>
@import url("./loading.css");
</style>
