<template>
  <v-list id="MessageGroupList">
    <template v-for="(messageGroup, index) in messageGroups">
      <!-- for each message group  -->
      <v-list-item :key="index">
        <v-list-item-content>
          <v-list-item-title
            v-html="messageGroup.date"
            class="messageGroup-date"
          ></v-list-item-title>

          <MessageList v-bind:messages="messageGroup.messages" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import MessageList from "./MessageList.vue";
import { createMessageGroup } from "../_mock";

export default {
  components: {
    MessageList,
  },
  data: () => ({
    messageGroups: [
      createMessageGroup("Yesterday", 6),
      createMessageGroup("Today", 3),
    ],
  }),
};
</script>

<style lang="scss">
#MessageGroupList {
  background-color: transparent;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 80vh; // take 75% view height for scrolling simplicity
  width: 100%;
}

.messageGroup-date {
  top: 3.75rem !important;
  display: inline-block;
  font-weight: 500;
  line-height: 1.75;
  padding: 0 0.5rem;
  word-break: break-word;
  text-align: center;
}
</style>