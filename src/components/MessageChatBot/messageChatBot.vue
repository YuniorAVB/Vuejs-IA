<template>
  <div class="messageChatBot">
    <div class="messageChatBot__wrapper" :style="stylesWrapper">
      <span class="messageChatBot__text" :style="stylesText">{{ text }}</span>
    </div>
  </div>
</template>
<script>
import Speak from "../../utils/speak";
export default {
  name: "MessageChatBot",
  props: {
    text: {
      required: true,
      type: String,
      default: "",
    },
    direction: {
      required: true,
      type: String,
      default: "start",
    },
    color: {
      required: true,
      type: String,
      default: "#1982f7",
    },
  },
  computed: {
    stylesText() {
      return {
        background: this.color,
        borderRadius: `20px 20px ${
          this.direction == "start" ? "2px" : "20px"
        } ${this.direction == "end" ? "2px" : "20px"}`,
      };
    },
    stylesWrapper() {
      return {
        justifyContent: `flex-${this.direction}`,
      };
    },
  },
  created() {
    if (this.direction == "end") {
      Speak({ text: this.text });
    }
  },
};
</script>
<style scoped>
@import url("./messageChatBot.css");
</style>
