<template>
  <div class="chatWelcome">
    <div class="chatWelcome__title">
      Bienvenidos al Asistente virtual, Beta SAC<v-icon color="orange"
        >fas fa-smile-wink</v-icon
      >
      !!
    </div>

    <div class="chatWelcome__title">Eliga una opcion:</div>

    <div class="chatWelcome__wrapper">
      <div
        class="chatWelcome__wrapper__card"
        v-for="(item, index) in data"
        :key="index"
        @click="clickOption(item.intent)"
      >
        <div class="chatWelcome__wrapper__card__icon">
          <img
            class="chatWelcome__wrapper__card__img"
            :src="`http://localhost:4000/img/${item.img}`"
          />
        </div>

        <div class="chatWelcome__wrapper__card__title">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Speak from "../../utils/speak";
export default {
  name: "ChatWelcome",
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  methods: {
    clickOption(option) {
      this.$emit("option", option);
    },
  },
  created() {
    Speak({
      text: "Bienvenidos, soy tu asistente virtual, selecciona una opcion ",
    });
  },
};
</script>
<style scoped>
@import url("./chatWelcome.css");
</style>
