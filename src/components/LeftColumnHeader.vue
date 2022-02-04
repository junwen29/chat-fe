<template>
  <v-container pa-0>
    <v-toolbar dense flat elevation="1">
      <DropDownMenu />

      <v-toolbar-title>Left Column Header</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import DropDownMenu from "./DropDownMenu.vue";

export default {
  name: "LeftColumnHeader",
  components: {
    DropDownMenu,
  },
};
</script>