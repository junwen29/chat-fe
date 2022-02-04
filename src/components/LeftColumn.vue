<template>
  <v-container id="LeftColumn-main" class="fill-height ma-0 pa-0" fluid>
    <v-row id="LeftColumn-header">
      <LeftColumnHeader />
    </v-row>
    <v-row id="LeftColumn-body">
      <LeftColumnBody />
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
  align-items: flex-start;
}

#LeftColumn-header {
  max-height: 48px;
  margin: 0px;
}

#LeftColumn-body {
  height: 100%;
  margin: 0px;
}
</style>