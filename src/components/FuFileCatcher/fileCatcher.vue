<template>
  <div
    class="a-fileCatcher"
    :style="[
      styleBackground,
      {
        width,
        height,
      },
      styleColors,
    ]"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
    @dragover.prevent
    @drop.prevent.stop="onDrop"
  >
    <label class="a-fileCatcher__inputReplace">
      <p v-if="positionText === 'top'" :class="[classTextInput, '-top']">
        {{ textInput }}
      </p>
      <p
        v-if="!inputState || Boolean(defaultImage)"
        :class="['a-fileCatcher__nameFile', { '-preview': showPreview }]"
      >
        <section>
          <span v-show="false" ref="fakeBtn" @click="cleanPreview"></span>
          <div class="a-fileCatcher__previewWrapper">
            <img
              v-show="showPreview"
              ref="image"
              class="a-fileCatcher__imagePreview"
              :src="previewImage"
              alt="Preview image"
            />
            <img
              v-show="!showPreview && Boolean(defaultImage)"
              class="a-fileCatcher__imageDefault"
              :src="defaultImage"
              alt="Default image"
            />
          </div>
          <span v-show="!onlyEmit">{{ selectNameFile }}</span>
        </section>
      </p>
      <p v-if="positionText === 'bottom'" :class="[classTextInput, '-bottom']">
        {{ textInput }}
      </p>
    </label>
    <input v-show="false" type="file" />
  </div>
</template>

<script>
export default {
  name: 'FuFileCatcher',
  components: {},
  props: {
    defaultImage: {
      type: String,
      default: null,
      required: false,
    },
    uploadText: {
      type: String,
      default: 'Arrastra un documento',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    positionText: {
      type: String,
      default: 'bottom',
    },
    color: {
      type: String,
      default: '#2ecc71',
    },
    withBackground: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#ff6600',
    },
    onlyEmit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textInput: this.uploadText,
      inputState: true,
      selectNameFile: null,
      isDragging: false,
      dragCount: 0,
      showPreview: false,
      previewImage: '',
      fileValue: '',
    };
  },
  computed: {
    classTextInput() {
      return this.inputState
        ? 'a-fileCatcher__textInput'
        : 'a-fileCatcher__textInputAfter';
    },
    styleBackground() {
      return this.isDragging && this.withBackground
        ? { background: this.backgroundColor }
        : null;
    },
    styleColors() {
      return { '--color': this.color };
    },
  },
  methods: {
    onDragEnter() {
      this.dragCount += 1;
      this.isDragging = true;

      return false;
    },
    onDragLeave() {
      this.dragCount -= 1;
      if (this.dragCount <= 0) this.isDragging = false;
    },
    assignFile(event) {
      [this.fileValue] = event.dataTransfer.files;
      this.selectNameFile = this.fileValue.name;
    },
    createPreview() {
      if (
        this.fileValue.type === 'image/jpeg' ||
        this.fileValue.type === 'image/png' ||
        this.fileValue.type === 'image/jpg'
      ) {
        this.previewImage = URL.createObjectURL(this.fileValue);
        this.showPreview = true;
      } else {
        this.showPreview = false;
        this.previewImage = '';
      }
    },
    onDrop(event) {
      this.dragCount -= 1;
      this.inputState = false;
      this.isDragging = false;
      if (event.dataTransfer.files.length > 0) {
        this.assignFile(event);
        if (!this.onlyEmit) this.createPreview();

        this.$emit('file', this.fileValue);
      }
    },
    cleanPreview() {
      this.fileValue = '';
      this.selectNameFile = null;
    },
  },
};
</script>

<style  scoped>
@import './fileCatcher.css';
</style>
