<template>
  <v-container id="MiddleColumn-main" fluid>
    <v-row>
      <MiddleColumnHeader />
    </v-row>
    <v-row>
      <MiddleColumnBody />
    </v-row>
  </v-container>
</template>

<script>
import MiddleColumnHeader from "./MiddleColumnHeader.vue";
import MiddleColumnBody from "./MiddleColumnBody.vue";

export default {
  name: "middle-column",

  components: {
    MiddleColumnHeader,
    MiddleColumnBody,
  },
};
</script>
