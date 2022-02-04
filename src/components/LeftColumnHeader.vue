<template>
  <v-container pa-0>
    <v-toolbar flat elevation="1" class="pl-4">
      <DropDownMenu />

      <v-toolbar-title>
        {{ isSearchingUsers ? "Select User for a chat" : "Chat Rooms" }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import DropDownMenu from "./DropDownMenu.vue";
import { mapState } from "vuex";

export default {
  name: "LeftColumnHeader",
  components: {
    DropDownMenu,
  },
  computed: {
    ...mapState("chat", ["isSearchingUsers"]),
  },
};
</script>