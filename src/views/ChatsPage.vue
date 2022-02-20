<template>
  <v-container class="fill-height ma-0 pa-0" fluid>
    <v-row class="fill-height">
      <v-col :cols="3" class="fill-height pa-0"><LeftColumn /></v-col>
      <v-col :cols="9" class="fill-height pa-0"><MiddleColumn /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import LeftColumn from "../components/LeftColumn.vue";
import MiddleColumn from "../components/MiddleColumn.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "ChatsPage",

  components: {
    LeftColumn,
    MiddleColumn,
  },
  computed: { ...mapState("websocket", ["isConnected"]) },
  methods: {
    ...mapActions("websocket", ["connect"]),
  },

  mounted: function () {
    !this.isConnected && this.connect();
  },
};
</script>