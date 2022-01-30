<template>
  <v-container id="MiddleColumn-main" ma-0 pa-0 fill-height fluid>
    <v-row>
      <v-col>
        <MiddleColumnHeader />
        <MiddleColumnBody />
      </v-col>
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

<style>
#MiddleColumn-main {
  align-items: inherit;
}
</style>