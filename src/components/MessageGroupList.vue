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
import _ from "lodash";
import moment from "moment";

const para =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pulvinar eleifend tempus. Sed sit amet sollicitudin dolor, non varius massa. Donec velit magna, ornare in arcu eu, hendrerit porta ante. Nam rhoncus fermentum nibh in fermentum. Maecenas nunc leo, luctus at orci at, ornare interdum leo. Ut libero nunc, eleifend eget nisi in, viverra malesuada sapien. Duis a dignissim orci. Aenean leo massa, fringilla in tincidunt sit amet, vestibulum volutpat ligula. Donec a efficitur nulla, nec aliquet quam.";

let getMessage = (id, para, time) => ({
  id: id,
  content: para,
  time: time,
  avatar: `https://cdn.vuetifyjs.com/images/lists/${id}.jpg`,
  from: getAuthor(),
});

let getAuthor = () => {
  return _.random(1, 2) == 1 ? "Calvin" : "Me";
};

export default {
  components: {
    MessageList,
  },
  data: () => ({
    messageGroups: [
      {
        date: "Yesterday",
        messages: _.range(10).map(() =>
          getMessage(_.random(1, 3), para, moment().format("HH:mm"))
        ),
      },
      {
        date: "Today",
        messages: _.range(10).map(() =>
          getMessage(_.random(1, 3), para, moment().format("HH:mm"))
        ),
      },
    ],
  }),
};
</script>

<style lang="scss">
#MessageGroupList {
  background-color: transparent;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 75vh; // take 75% view height for scrolling simplicity
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