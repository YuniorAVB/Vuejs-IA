<template>
  <div class="postulant">
    <v-card>
      <v-card-title>
        Postulantes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          style="max-width:300px"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.postulant_url_cv="{ item }">
          <v-btn
            target="_blank"
            color="primary"
            small
            :to="item.postulant_url_cv"
          >
            Ver CV
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Postulante",
  data() {
    return {
      headers: [
        { text: "NOMBRE", value: "postulant_name" },
        { text: "APELLIDOS", value: "postulant_last_name" },
        { text: "DNI", value: "postulant_dni" },
        { text: "CORREO", value: "postulant_email" },
        { text: "OPCIONES", value: "postulant_url_cv" },
      ],
      items: [],
      search: "",
    };
  },
  methods: {
    getDataPostulant() {
      axios.get("/postulant").then((res) => {
        this.items = res.data.data;
      });
    },
  },
  created() {
    this.getDataPostulant();
  },
};
</script>
