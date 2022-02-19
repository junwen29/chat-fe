<template>
  <v-container
    v-if="chatRooms.loading || chatRooms.error"
    fluid
    class="fill-height"
    style="width: 50%; margin: auto; justify-content: center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="chatRooms.loading"
    ></v-progress-circular>
    <span v-else-if="chatRooms.error">Unable to fetch chat rooms result</span>
  </v-container>

  <v-list id="chat-room-list" three-line v-else>
    <template v-for="(item, index) in chatRooms.items">
      <v-subheader
        v-if="item.header"
        :key="item.header"
        v-text="item.header"
      ></v-subheader>

      <v-divider
        v-else-if="item.divider"
        :key="index"
        :inset="item.inset"
      ></v-divider>

      <v-list-item v-else :key="item.title">
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item />
  </v-list>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "chat-room-list",
  computed: {
    ...mapState("chatRooms", ["chatRooms"]),
  },
  methods: {
    ...mapActions("chatRooms", ["getChatRooms"]),
  },
  mounted: function () {
    this.getChatRooms();
  },
};
</script>

<style lang="scss" scoped>
#chat-room-list {
  max-height: 200px;
  padding-left: 4px;
}
</style>