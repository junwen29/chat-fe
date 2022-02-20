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
    <v-list-item-group color="primary" v-model="selectedItem">
      <template v-for="(item, index) in chatRooms.items">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          @click="() => selectChatRoom(item)"
        >
          <v-list-item-avatar>
            <!-- <v-img :src="item.avatar"></v-img> -->
            <v-avatar color="blue">
              <span class="white--text text-h5">{{ item.initials }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text
              v-text="item.time"
              class="pb-2"
            ></v-list-item-action-text>
            <v-chip v-text="item.unreadMessageCount"></v-chip>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "chat-room-list",
  data: () => ({
    selectedItem: -1,
  }),
  computed: {
    ...mapState("chatRooms", ["chatRooms", "selectedChatRoom"]),
  },
  methods: {
    ...mapActions("chatRooms", ["getChatRooms", "selectChatRoom"]),
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