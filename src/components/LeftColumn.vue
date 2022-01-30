<template>
  <v-container id="LeftColumn-main" ma-0 pa-0 fluid fill-height>
    <v-row>
      <v-col>
        <LeftColumnHeader />
        <LeftColumnBody />
        <v-btn id="NewChatButton" class="mx-2" fab dark large color="purple">
          <v-icon dark> mdi-message-text </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import LeftColumnHeader from "./LeftColumnHeader.vue";
import LeftColumnBody from "./LeftColumnBody.vue";

export default {
  name: "left-column",
  components: {
    LeftColumnHeader,
    LeftColumnBody,
  },
};
</script>

<style>
#LeftColumn-main {
  align-items: inherit;
}

#NewChatButton {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
}
</style>