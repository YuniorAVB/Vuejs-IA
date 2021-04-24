<template>
  <div class="chatBot">
    <div class="chatBot__header">
      <div class="chatBot__header__title">
        <v-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>
        Asistente Virtual
      </div>
    </div>

    <div class="chatBot__wrapper">
      <div class="chatBot__wrapper__messages" ref="chatBot__wrapper">
        <component
          v-for="(item, index) in listComponentsMessage"
          :key="index"
          :is="item.component"
          v-bind="item.props"
          v-on="item.events"
        ></component>

        <div v-show="loading" class="chatBot__wrapper__loading">
          <chat-bubble />
        </div>
        <loading v-show="loadingUpload" />
      </div>
      <div class="chatBot__wrapper__form">
        <v-form @submit.prevent="sumitForm">
          <v-text-field outlined v-model="messageUser" label="Mensaje">
            <template v-slot:append>
              <v-icon
                color="primary"
                @click="sumitForm"
                class="chatBot__wrapper__form__submit"
              >
                fas fa-location-arrow
              </v-icon>
            </template>
          </v-text-field>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FuFileCatcher from "../FuFileCatcher";
import MessageChatBot from "../MessageChatBot";
import ChatBubble from "../ChatTyping";
import ChatStall from "../ChatStall";
import ChatWelcome from "../ChatWelcome";
import Loading from "../Loading";
import ImgFileUpload from "../../assets/images/png/file-upload2.png";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "chatBot",
  components: {
    ChatBubble,
    ChatWelcome,
    Loading,
  },
  data() {
    return {
      messageUser: "",
      userId: uuidv4(),
      listComponentsMessage: [],
      loading: false,
      loadingUpload: false,
    };
  },

  methods: {
    async sumitForm() {
      if (this.messageUser !== null && this.messageUser !== "") {
        const messageInput = this.messageUser;
        this.loading = true;
        this.messageUser = "";
        this.buildMessageUser(messageInput);
        const result = await axios.post("/test", {
          userQuery: messageInput,
          userId: this.userId,
        });
        this.loading = false;
        this.parseMessage(result.data.data[0].queryResult.fulfillmentText);
      }
    },
    parseMessage(jsonMessage) {
      console.log(jsonMessage);
      try {
        const json = JSON.parse(jsonMessage);

        if (json.type == "welcome") {
          this.listComponentsMessage.push({
            component: ChatWelcome,
            props: { data: json.data },
            events: { option: this.getOption },
          });
        } else if (json.type == "stallFree") {
          this.listComponentsMessage.push({
            component: ChatStall,
            props: { listStall: json.data },
          });
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          if (jsonMessage == "file") {
            this.buildFileInput();
          } else {
            this.buildMessageBot(jsonMessage);
          }
        }
      }
    },
    async getOption(option) {
      this.loading = true;
      const result = await axios.post("/test", {
        userQuery: option,
        userId: this.userId,
      });
      this.loading = false;

      this.parseMessage(result.data.data[0].queryResult.fulfillmentText);
    },
    scrollBottom() {
      const chatBotWrapper = this.$refs.chatBot__wrapper;
      chatBotWrapper.scrollTop =
        chatBotWrapper.scrollHeight - chatBotWrapper.clientHeight;
    },
    async getFileUpload(file) {
      const formData = new FormData();
      this.loadingUpload = true;
      formData.append("file", file);
      const { data } = await axios.post("/upload/cv", formData);
      const result = await axios.post("/test", {
        userQuery: data.name,
        userId: this.userId,
      });
      this.loadingUpload = false;
      this.parseMessage(result.data.data[0].queryResult.fulfillmentText);
    },
    buildFileInput() {
      this.listComponentsMessage.push({
        component: FuFileCatcher,
        props: {
          color: "#3299db",
          withBackground: true,
          uploadText: "Arrastre aqui su CV",
          defaultImage: ImgFileUpload,
          backgroundColor: "#3299db1a",
          height: "200px",
        },
        events: {
          file: this.getFileUpload,
        },
      });
    },
    buildMessageUser(message) {
      this.listComponentsMessage.push({
        component: MessageChatBot,
        props: { text: message, color: "#4caf50ad", direction: "start" },
      });
    },
    buildMessageBot(message) {
      this.listComponentsMessage.push({
        component: MessageChatBot,
        props: { text: message, color: "#2196f3c9", direction: "end" },
      });
    },
  },
  updated() {
    this.scrollBottom();
  },
  created() {
    console.log("CREADO");
  },
};
</script>
<style scoped>
@import url("./chatBot.css");
</style>
