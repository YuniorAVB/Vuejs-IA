<template>
  <v-app>
    <Navbar></Navbar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <float-button></float-button>

    <Footer></Footer>
  </v-app>
</template>
<script>
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FloatButton from "../../components/FloatButton";

export default {
  name: "MainLayout",
  components: {
    Footer,
    Navbar,
    FloatButton,
  },
};
</script>

<style scoped>
@import url("./mainLayout.css");
</style>
