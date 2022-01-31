<template>
  <v-container id="LeftColumn-Header" py-0 pr-0 mx-0>
    <div>
      <v-toolbar>
        <DropDownMenu />

        <v-toolbar-title>Left Column Header</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
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

