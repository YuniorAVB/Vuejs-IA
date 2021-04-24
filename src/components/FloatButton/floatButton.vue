<template>
  <div class="floatButton">
    <div class="floatButton__wrapper" v-show="showWrapper">
      <form-bot v-if="!showDialogBot" @formSuccess="showDialogBot = $event" />
      <!-- <iframe
        class="floatButton__chatBot"
        v-if="showDialogBot"
        allow="microphone;"
        width="100%"
        height="100%"
        src="https://console.dialogflow.com/api-client/demo/embedded/d6e57e2b-76f1-4726-a59e-cf08d8451677"
      /> -->
      <chat-bot v-if="showDialogBot"></chat-bot>
    </div>

    <v-btn :color="color" fab @click="showWrapper = !showWrapper">
      <v-icon class="far fa-comments">{{ icon }}</v-icon>
    </v-btn>
  </div>
</template>
<script>
import FormBot from "../FormBot";
import ChatBot from "../ChatBot";
export default {
  name: "FloatButton",
  components: {
    FormBot,
    ChatBot,
  },
  props: {
    icon: {
      type: String,
      required: false,
      default: "far fa-comments",
    },
    color: {
      type: String,
      required: false,
      default: "primary",
    },
  },
  data() {
    return {
      showDialogBot: false,
      showWrapper: false,
    };
  },
  methods: {
    showBot() {
      if (this.showDialogBot) {
        console.log("success");
      }
    },
  },
};
</script>
<style scoped>
@import url("./flatButton.css");
</style>
