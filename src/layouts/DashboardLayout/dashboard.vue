<template>
  <v-app>
    <navbar-admin></navbar-admin>
    <sidebar></sidebar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Sidebar from "../../components/SidebarAdmin";
import NavbarAdmin from "../../components/NavbarAdmin";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    NavbarAdmin,
  },
};
</script>
