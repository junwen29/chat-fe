<template>
  <v-list id="MessageList">
    <template v-for="(message, index) in chatMessages">
      <v-list-item
        v-if="message.bottom"
        :key="index"
        class="MessageList-bottom"
        style="width: 0; height: 0"
      >
        <!-- <v-text-field v-text="'bottom'"></v-text-field> -->
      </v-list-item>

      <v-list-item
        v-else
        :key="index"
        :class="message.from === 'Me' ? 'bubble-right' : 'bubble-left'"
      >
        <v-list-item-avatar>
          <v-img :src="message.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content
          :class="
            message.from === 'Me'
              ? 'message-content-right'
              : 'message-content-left'
          "
        >
          <v-card
            :class="
              message.from === 'Me' ? 'bubble-right-card' : 'bubble-left-card'
            "
          >
            <h4 v-if="message.from !== 'Me'" v-html="message.from"></h4>
            <p v-html="messageHtml(message.content, message.time)"></p>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  props: ["messages"],
  data: function () {
    return {
      chatMessages: this.messages,
    };
  },
  methods: {
    messageHtml(content, time) {
      return (
        `<p class="message-body">${content}<span class="message-meta">` +
        `<span class="message-time">${time}</span></span></p>`
      );
    },
  },
  mounted: function () {
    const el = this.$el.getElementsByClassName("MessageList-bottom")[0];
    // do not use scroll into view as it would cut away the left and middle header components from the visible area
    // use focus() instead so that visible area does not change.
    if (el) {
      el.focus();
    }
  },
};
</script>

<style>
#MessageList {
  background-color: transparent;
}

.bubble-left {
  flex-direction: row;
}

.bubble-right {
  flex-direction: row-reverse;
}

.bubble-left-card {
  max-width: 500px;
  padding: 16px;
}

.bubble-right-card {
  padding: 16px;
  max-width: 500px;
}

.message-content-left {
  padding: 0.3125rem 0.5rem 0.375rem;
  flex-direction: row;
}

.message-content-right {
  padding: 0.3125rem 0.5rem 0.375rem;
  flex-direction: row-reverse;
}

.message-body {
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
  line-height: 1.3125;
  text-align: left;
  display: flow-root;
  unicode-bidi: plaintext;
  padding: 4px 0;
}

.message-meta {
  position: relative;
  top: 0.375rem;
  bottom: auto !important;
  float: right;
  line-height: 1.35;
}

.message-time {
  margin-right: 0.1875rem;
  font-size: 0.75rem;
  white-space: nowrap;
}
</style>