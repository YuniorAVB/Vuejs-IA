<template>
  <v-app-bar
    app
    :collapse="!collapseOnScroll"
    :collapse-on-scroll="collapseOnScroll"
    absolute
    color="green"
    dark
    style="height:57px"
  >
    <v-toolbar-title>Dashboard Beta</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="closeSession">
      <v-icon>
        fas fa-sign-out-alt
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "NavbarAdmin",
  data: () => ({
    collapseOnScroll: true,
  }),
  methods: {
    closeSession() {
      this.$router.push("/");
    },
  },
};
</script>
