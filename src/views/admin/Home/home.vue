<template>
  <div>
    <v-row>
      <v-card class="ma-5" v-for="(item, index) in listVacantes" :key="index">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5 ">{{ item.stall_name }}</v-card-title>

            <v-card-subtitle>Habilidades Requeridas</v-card-subtitle>

            <v-card-actions>
              <v-chip
                color="primary"
                class="ma-2"
                v-for="(skill, index) in jsonParser(item.stall_skill)"
                :key="index"
              >
                {{ skill.name }}
              </v-chip>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      listVacantes: [
        {
          stall_name: "PROGRAMADOR",
          skills: [{ name: "JAVA" }, { name: "GO" }],
        },
      ],
    };
  },
  methods: {
    jsonParser(json) {
      try {
        return JSON.parse(json).data;
      } catch (error) {
        return [];
      }
    },
  },
  async mounted() {
    const { data } = await axios.get("/stall");

    console.log(data);
    this.listVacantes = data.data;
  },
};
</script>
