<template>
  <v-container class="pa-0 ma-0 overflow-y-auto" fluid>
    <UserList v-if="isSearchingUsers" />

    <ChatList v-else />

    <v-card class="fab-card">
      <v-card-text class="fab-card-text">
        <v-fab-transition>
          <v-btn
            v-show="!isSearchingUsers"
            color="pink"
            dark
            absolute
            top
            right
            fab
            @click="clickedNewChatButton"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ChatList from "./ChatList";
import UserList from "./UserList";
import { mapActions, mapState } from "vuex";

export default {
  name: "left-column-body",
  components: {
    ChatList,
    UserList,
  },
  methods: {
    ...mapActions("chat", ["clickedNewChatButton"]),
  },
  computed: {
    ...mapState("chat", ["isSearchingUsers"]),
  },
};
</script>

<style lang="scss" scoped>
.fab-card {
  height: 0px;
  position: absolute;
  width: 25%;
  bottom: 3rem;
}
.fab-card-text {
  height: 0px;
  position: relative;
}
</style>
