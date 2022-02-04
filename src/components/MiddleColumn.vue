<template>
  <v-container id="MiddleColumn-main" fluid class="fill-height">
    <v-row>
      <MiddleColumnHeader />
    </v-row>
    <v-row class="fill-height">
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
