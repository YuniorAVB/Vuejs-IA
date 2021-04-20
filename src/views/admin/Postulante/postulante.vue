<template>
  <div class="postulant">
    <v-card>
      <v-card-title>
        Postulantes
        <v-spacer></v-spacer>
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              style="max-width:300px"
            />
          </v-col>
          <v-col>
            <v-select
              :items="options"
              item-text="text"
              item-value="id"
              label="Puesto"
              v-model="optionStall"
            ></v-select>
          </v-col>
        </v-row>
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
            :href="`http://localhost:4000/cv/${item.postulant_url_cv}`"
          >
            Ver CV
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Procesando ....
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      options: [],
      optionStall: "",
      dialog: false,
    };
  },
  watch: {
    optionStall(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getDataPostulantStall(newValue);
      }
    },
  },
  methods: {
    getDataPostulant() {
      axios.get("/postulant").then((res) => {
        this.items = res.data.data;
      });
    },
    async getStalls() {
      const res = await axios.get("/stall");

      this.options = res.data.data.reduce((acc, item) => {
        return [...acc, { text: item.stall_name, id: item.stall_id }];
      }, []);
    },
    async getDataPostulantStall(idStall) {
      this.dialog = true;
      const result = await axios.get("/postulant/stall/" + idStall);
      this.items = result.data.data;
      this.dialog = false;
    },
  },
  created() {
    this.getDataPostulant();
    this.getStalls();
  },
};
</script>
