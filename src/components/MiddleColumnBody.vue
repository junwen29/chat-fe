<template>
  <v-container id="MiddleColumn-body" fluid class="fill-height">
    <div id="MessageList">hello</div>
    <MiddleColumnFooter />
  </v-container>
</template>

<script>
import MiddleColumnFooter from "./MiddleColumnFooter";

export default {
  components: {
    MiddleColumnFooter,
  },
};
</script>

<style>
#MiddleColumn-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#MessageList {
  overflow-y: overlay;
  overflow-x: hidden;
  flex: 1;
  width: 100%;
}
</style>