<template>
  <div class="chatOptions">
    <div
      class="chatOptions__card"
      v-for="(stall, indexStall) in listStall"
      :key="indexStall"
    >
      <div class="chatOptions__card__title">
        {{ stall.stall_name }} | Vacantes: {{ stall.stall_vacant }}
      </div>

      <div class="chatOptions__card__subTitle">
        Habilidades Requeridas
      </div>

      <div class="chatOptions__card__body">
        <span
          v-for="(item, index) in stall.stall_skill"
          :key="index"
          class="chatOptions__card__body__skill"
        >
          {{ item }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatOptions",
  props: {
    listStall: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
<style scoped>
@import url("./chatOptions.css");
</style>
