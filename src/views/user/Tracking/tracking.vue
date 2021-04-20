<template>
  <div class="tracking">
    <div v-if="showImgError" class="tracking__image">
      <img src="../../../assets/images/jpg/404.jpg" />
    </div>
    <div v-if="showImgTracking" class="tracking__image">
      <img src="../../../assets/images/jpg/tracking.jpg" />
    </div>
    <h1 class="tracking__message">{{ message }}</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Tracking",
  data() {
    return {
      message: "Numero de Tracking no Existe",
      showImgError: true,
      showImgTracking: false,
    };
  },
  methods: {
    async getTracking() {
      const idTracking = this.$route.params.id;
      const res = await axios.get("/postulant/tracking/" + idTracking);

      if (res.data.data.length !== 0) {
        const data = res.data.data;
        if (data[0].postulant_qualified == 0) {
          this.showImgError = false;
          this.showImgTracking = true;
          this.message = "Su proceso de postulacion sigue en Tramites";
        }
      }
    },
  },
  mounted() {
    this.getTracking();
  },
};
</script>
<style scoped>
@import url("./tracking.css");
</style>
