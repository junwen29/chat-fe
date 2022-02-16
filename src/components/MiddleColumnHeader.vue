<template>
  <v-container id="MiddleColumn-header" pa-0 fluid>
    <v-toolbar flat elevation="1">
      <v-avatar>
        <v-img
          :src="selectedUser.avatar"
          v-if="selectedUser && selectedUser.avatar"
        ></v-img>
      </v-avatar>

      <v-toolbar-title v-if="selectedUser && selectedUser.title" class="pl-4">
        <p class="pa-0 ma-0 text-h6" v-html="selectedUser.title"></p>
        <p class="pa-0 ma-0 text-subtitle-1" v-html="selectedUser.subtitle"></p>
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
  },
};
</script>

<style>
#MiddleColumn-header {
  max-height: 64px;
}
</style>