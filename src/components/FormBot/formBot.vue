<template>
  <div class="formBot">
    <div class="formBot__header">
      <div class="formBot__header__title">
        Desconectado
      </div>

      <div class="formBot__header__text">
        Rellene el formulario a continuación y le contestaremos lo antes
        posible.
      </div>
    </div>
    <div class="formBot__form">
      <v-form @submit.prevent="sumitForm">
        <v-text-field
          v-model="name"
          :counter="20"
          :rules="nameRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Correo"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Aceptar terminos y condiciones"
          required
        ></v-checkbox>

        <v-btn class="formBot__form__button" color="primary" type="submit">
          Enviar
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormBot",
  data() {
    return {
      name: "",
      email: "",
      checkbox: false,
      nameRules: [
        (v) => !!v || "Nombre es requrido",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
      emailRules: [
        (v) => !!v || "Correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    sumitForm() {
      this.$emit("formSuccess", true);
    },
  },
};
</script>
<style scoped>
@import url("./formBot.css");
</style>
