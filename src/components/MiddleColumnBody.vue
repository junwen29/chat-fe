<template>
  <v-container id="MiddleColumn-body" fluid class="fill-height">
    <MessageGroupList />
    <MiddleColumnFooter v-if="selectedChatRoom.chatRoom" />
  </v-container>
</template>

<script>
import MiddleColumnFooter from "./MiddleColumnFooter";
import MessageGroupList from "./MessageGroupList";
import { mapState } from "vuex";

export default {
  components: {
    MiddleColumnFooter,
    MessageGroupList,
  },
  computed: {
    ...mapState("chatRooms", ["selectedChatRoom"]),
  },
};
</script>

<style>
#MiddleColumn-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa !important;
  border-color: #fafafa !important;
}
</style>