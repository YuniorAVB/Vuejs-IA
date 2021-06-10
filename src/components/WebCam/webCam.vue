<template>
  <div class="webCam">
    <div class="webCam__wrapper" :class="{ isPlay: isPlay }">
      <vue-record-video
        ref="webcamrecord"
        @stream="getStream"
        @result="onResult"
        mimeType="video/webm"
      />

      <div class="webCam__wrapper__video">
        <video ref="video" height="100%" width="100%" autoplay></video>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecordVideo from "./VueRecordVideo";

import axios from "axios";

export default {
  name: "WebCam",
  components: {
    VueRecordVideo,
  },
  data() {
    return {
      isPlay: false,
    };
  },
  methods: {
    async onResult(blobVideo) {
      this.isPlay = false;
      const blob = new Blob([blobVideo], { type: "video/webm" });
      // var videObject = URL.createObjectURL(blob);

      const formData = new FormData();

      formData.append("file", blob);
      const { data } = await axios.post("/upload/video", formData);
      this.$emit("submitVideo", data.name);
    },

    playWebcam() {
      this.$refs.webcamrecord.startRecording();
    },
    stopWebcam() {
      this.isPlay = false;
      this.$refs.webcamrecord.startRecording();
    },
    getStream(stream) {
      this.isPlay = true;
      this.$refs.video.srcObject = stream;
    },
  },
};
</script>

<style>
@import url("./webCam.css");
</style>
