import { loadScripts } from "./loadScripts";

import StartAudioContext from "startaudiocontext";
import Tone from "tone";

StartAudioContext(Tone.context);

export default {
  methods: {
    async start() {
      if (this.isRecording) {
        return;
      }

      try {
        this.$_stream = await this.getStream();
        await this.prepareRecorder();

        this.$_mediaRecorder.start();
        Tone.Transport.start();
      } catch (e) {
        this.$emit("error", e);
        // eslint-disable-next-line
        console.error(e);
      }
    },

    stop() {
      if (!this.isRecording) return;

      this.$_mediaRecorder.stop();
      this.$_stream.getTracks().forEach((t) => t.stop());
      this.$_mic.close();

      Tone.Transport.stop();
    },

    async getStream() {
      this.$_mic = new Tone.UserMedia();
      this.debug && console.log("tonejs microphone instance", this.$_mic);

      await this.$_mic.open();
      this.debug && console.log("mic is open", this.$_mic);

      const dest = Tone.context.createMediaStreamDestination();
      this.debug && console.log("context.createMediaStreamDestination", dest);

      this.$_mic.connect(dest);
      this.debug && console.log("mic connected");

      this.$_stream = dest.stream;
      this.$emit("stream", this.$_stream);

      return this.$_stream;
    },

    async prepareRecorder() {
      if (!this.$_stream) {
        return;
      }

      await loadScripts([]);

      let CustomMediaRecorder = window.MediaRecorder;

      // Check if MediaRecorder available.
      if (!CustomMediaRecorder) {
        if (!window.OpusMediaRecorder) {
          console.error("OpusMediaRecorder is not defined");
        }

        // eslint-disable-next-line no-undef
        CustomMediaRecorder = OpusMediaRecorder;
      }
      // Check if a target format (e.g. audio/ogg) is supported.
      else if (!CustomMediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
        if (!window.OpusMediaRecorder) {
          console.error("OpusMediaRecorder is not defined");
        }

        // eslint-disable-next-line no-undef
        CustomMediaRecorder = OpusMediaRecorder;
      }

      // If you already load encoderWorker.js using <script> tag,
      // you don't need to define encoderWorkerFactory.
      const workerOptions = {
        OggOpusEncoderWasmPath:
          "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm",
        WebMOpusEncoderWasmPath:
          "https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm",
      };

      this.$_mediaRecorder = new CustomMediaRecorder(
        this.$_stream,
        {
          // mimeType: this.mimeType
          mimeType: "", // browser dependent
        },
        workerOptions
      );
      this.debug && console.log("⏺", this.$_mediaRecorder);

      this.$_mediaRecorder.ignoreMutedMedia = true;

      this.$_mediaRecorder.addEventListener("start", () => {
        this.isRecording = true;
        this.isPaused = false;
        this.$emit("start");
      });

      this.$_mediaRecorder.addEventListener("resume", () => {
        this.isRecording = true;
        this.isPaused = false;
        this.$emit("resume");
      });

      this.$_mediaRecorder.addEventListener("pause", () => {
        this.isPaused = true;
        this.$emit("pause");
      });

      // Collect the available data into chunks
      this.$_mediaRecorder.addEventListener(
        "dataavailable",
        (e) => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        },
        true
      );

      // On recording stop get the data and emit the result
      // than clear all the recording chunks
      this.$_mediaRecorder.addEventListener(
        "stop",
        () => {
          this.$emit("stop");

          const blobData = new Blob(this.chunks, {
            type: this.$_mediaRecorder.mimeType,
          });
          if (blobData.size > 0) {
            this.$emit("result", blobData);
          }
          this.chunks = [];
          this.isPaused = false;
          this.isRecording = false;

          this.$_mic.dispose();
        },
        true
      );
    },
  },
};
