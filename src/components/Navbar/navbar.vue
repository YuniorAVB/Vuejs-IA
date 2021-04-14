<template>
  <div class="navbar" :class="{ animate__bounceIn: effectBoom }">
    <v-app-bar app :color="colorNavbar" :flat="shadowNavbar">
      <div class="navbar__wrapper">
        <div class="navbar__wrapper__header">
          <v-toolbar-title class="navbar__logo">Empresa Beta</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mx-1"
            v-for="(item, index) in links"
            :key="index"
            :to="item.path"
          >
            {{ item.label }}
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          label: "Home",
          path: "/",
        },
        {
          label: "About",
          path: "/about",
        },
        {
          label: "Contacto",
          path: "/contacto",
        },
      ],
      colorNavbar: "transparent",
      shadowNavbar: false,
      effectBoom: false,
    };
  },
  methods: {
    scrollEffect() {
      this.colorNavbar = window.scrollY == 0 ? "transparent" : "#fff";
      this.shadowNavbar = window.scrollY == 0;
      this.effectBoom = window.scrollY == 0;
    },
  },
  created() {
    window.addEventListener("scroll", this.scrollEffect);
  },
};
</script>
<style scoped>
@import url("./navbar.css");
</style>
