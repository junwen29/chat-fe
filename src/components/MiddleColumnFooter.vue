<template>
  <div id="MiddleColumn-footer">
    <div id="MiddleColumn-footer-child">
      <v-text-field
        v-model="message"
        :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
        :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
        :prepend-icon="icon"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        @click:append="toggleMarker"
        @click:append-outer="sendMessage"
        @click:prepend="changeIcon"
        @click:clear="clearMessage"
      ></v-text-field>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    password: "Password",
    show: false,
    message: "Hey!",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>

<style lang="scss">
#MiddleColumn-footer {
  height: 0px;
  position: absolute;
  width: 75%;
  bottom: 5rem;
}

#MiddleColumn-footer-child {
  top: 0;
  width: 100%;
  padding: 0 1rem;
  position: relative;
  display: flex;
  align-items: flex-end;
}
</style>