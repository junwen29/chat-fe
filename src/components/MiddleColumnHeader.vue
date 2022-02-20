<template>
  <v-container id="MiddleColumn-header" pa-0 fluid>
    <v-toolbar flat elevation="1">
      <v-avatar>
        <v-img :src="chatRoomAvatar" v-if="chatRoomAvatar"></v-img>
      </v-avatar>

      <v-toolbar-title v-if="chatRoomTitle" class="pl-4">
        <p class="pa-0 ma-0 text-h6" v-html="chatRoomTitle"></p>
        <p class="pa-0 ma-0 text-subtitle-1" v-html="chatRoomSubtitle"></p>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.prevent="disconnect" :disabled="!isConnected">
            <v-icon v-bind="attrs" v-on="on">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Disconnect Web Socket</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.prevent="connect" :disabled="isConnected">
            <v-icon v-bind="attrs" v-on="on">mdi-connection</v-icon>
          </v-btn>
        </template>
        <span>Connect Web Socket</span>
      </v-tooltip>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <UserAvatarMenu />
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserAvatarMenu from "./UserAvatarMenu.vue";

export default {
  components: { UserAvatarMenu },
  methods: {
    ...mapActions("websocket", ["connect", "disconnect"]),
  },
  computed: {
    ...mapState("websocket", ["isConnecting", "isConnected"]),
    ...mapState("chat", ["selectedUser"]),
    ...mapState("chatRooms", ["selectedChatRoom"]),
    chatRoomTitle() {
      if (this.selectedChatRoom && this.selectedChatRoom.chatRoom) {
        return (
          this.selectedChatRoom.chatRoom && this.selectedChatRoom.chatRoom.title
        );
      } else if (this.selectedUser && this.selectedUser.title) {
        return this.selectedUser.title;
      } else return "";
    },
    chatRoomSubtitle() {
      if (this.selectedChatRoom && this.selectedChatRoom.chatRoom) {
        return this.selectedChatRoom.chatRoom && "";
      } else if (this.selectedUser && this.selectedUser.subtitle) {
        return this.selectedUser.subtitle;
      } else return "";
    },
    chatRoomAvatar() {
      if (this.selectedChatRoom && this.selectedChatRoom.chatRoom) {
        return (
          this.selectedChatRoom.chatRoom &&
          this.selectedChatRoom.chatRoom.avatar
        );
      } else if (this.selectedUser && this.selectedUser.avatar) {
        return this.selectedUser.avatar;
      } else return "";
    },
  },
};
</script>

<style>
#MiddleColumn-header {
  max-height: 64px;
}
</style>