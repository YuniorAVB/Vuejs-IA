<template>
  <div class="stall">
    <!-- <div class="stall__title v-heading text-h4 py-5">Stall</div> -->

    <div class="stall__controls">
      <v-card elevation="5">
        <div class="stall__controls__row">
          <v-form @submit.prevent="submitStall">
            <div class="stall__controls__title v-heading text-h6 pb-4">
              Agregar Nuevos Puestos
            </div>
            <v-text-field
              v-model="stall_name"
              outlined
              placeholder="Nombre del Puesto"
              hint="Nombre del Puesto"
              prepend-inner-icon="fas fa-file-signature"
            />

            <v-text-field
              prepend-inner-icon="fas fa-sort-numeric-up-alt"
              v-model="stall_vacant"
              outlined
              placeholder="Cantidad de Vacantes"
              hint="Cantidad de Vacantes"
              type="number"
            />

            <v-row>
              <v-col>
                <v-text-field
                  v-model="stall_kill_one"
                  outlined
                  placeholder="Habilidades"
                  hint="Habilidades"
                  prepend-inner-icon="fas fa-user-cog"
                />
              </v-col>
              <v-col>
                <v-btn icon fab @click="addSkill">
                  <v-icon color="red">
                    fas fa-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-timeline
              v-if="stall_skill.length > 0"
              clipped
              dense
              class="my-4"
            >
              <v-timeline-item
                v-for="(skill, index) in stall_skill"
                :key="index"
                small
                color="pink"
              >
                <v-row class="pt-1">
                  <v-col cols="12">
                    <strong>{{ skill.name }}</strong>
                    <v-btn
                      @click="deleteSkill(skill.name)"
                      class="mx-2"
                      x-small
                      icon
                      fab
                    >
                      <v-icon color="pink"> fas fa-times</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
            <div>
              <v-btn
                v-show="stall_id == ''"
                right
                type="submit"
                class="stall__controls__button"
                large
                color="primary"
              >
                Agregar Puesto
              </v-btn>

              <div v-show="stall_id !== ''">
                <v-btn
                  right
                  type="submit"
                  class="stall__controls__button"
                  color="success"
                >
                  Actualizar
                </v-btn>
                <v-btn
                  right
                  type="button"
                  class="stall__controls__button"
                  color="error"
                  @click="clearForm"
                >
                  Cancelar
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </v-card>
    </div>
    <v-card class="my-5" elevation="4">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.stall_id="{ item }">
          <v-icon
            class="stall__options"
            color="green"
            @click="editStallById(item.stall_id)"
          >
            fas fa-edit</v-icon
          >

          <v-icon color="error" @click="editStallById(item.stall_id)">
            fas fa-trash</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Stall",
  data() {
    return {
      stall_name: "",
      stall_vacant: 0,
      stall_skill: [],
      stall_id: "",
      stall_kill_one: "",
      headers: [
        { text: "NOMBRE", value: "stall_name" },
        { text: "SKILLS", value: "stall_skill" },
        { text: "VACANTE", value: "stall_vacant" },
        { text: "OPCIONES", value: "stall_id" },
      ],
      items: [],
      search: "",
    };
  },
  methods: {
    async submitStall() {
      const bodyMessage = {
        stall_name: this.stall_name,
        stall_vacant: this.stall_vacant,
        stall_skill: JSON.stringify({ data: this.stall_skill }),
      };

      if (this.stall_id !== "") {
        const result = await axios.put("/stall/" + this.stall_id, bodyMessage);
        if (result.status) {
          this.$swal("Se Actualizo con exito..!!!");
          this.clearForm();
          this.getStalls();
        }
      } else {
        const result = await axios.post("/stall", bodyMessage);
        if (result.status) {
          this.$swal("Se Registro con exito..!!!");
          this.clearForm();
          this.getStalls();
        }
      }
    },
    clearForm() {
      this.stall_skill = [];
      this.stall_name = "";
      this.stall_vacant = 0;
      this.stall_id = "";
    },

    addSkill() {
      if (this.stall_kill_one) {
        this.stall_skill.push({ name: this.stall_kill_one });
        this.stall_kill_one = "";
      }
    },
    async editStallById(id) {
      const res = await axios.get("/stall/" + id);
      if (res.data.data.length > 0) {
        const data = res.data.data[0];

        this.stall_name = data.stall_name;
        this.stall_vacant = data.stall_vacant;

        const skillObject = JSON.parse(data.stall_skill);

        this.stall_skill = skillObject.data;
        this.stall_id = data.stall_id;
      }
    },
    deleteSkill(name) {
      this.stall_skill = this.stall_skill.filter((skill) => {
        return skill.name !== name;
      });
    },
    async getStalls() {
      const res = await axios.get("/stall");

      this.items = res.data.data.reduce((acc, item) => {
        return [
          ...acc,
          { ...item, stall_skill: this.buildSkillData(item.stall_skill) },
        ];
      }, []);
    },
    buildSkillData(jsonData) {
      const data = JSON.parse(jsonData);

      return data.data.reduce((acc, item) => {
        return [...acc, ` ${item.name}`];
      }, []);
    },
  },
  created() {
    this.getStalls();
  },
};
</script>
<style scoped>
@import url("./stall.css");
</style>
