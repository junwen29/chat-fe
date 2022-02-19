<template>
  <v-container
    v-if="all.loading || all.error"
    fluid
    class="fill-height"
    style="width: 50%; margin: auto; justify-content: center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="all.loading"
    ></v-progress-circular>
    <span v-else-if="all.error">Unable to fetch users result</span>
  </v-container>

  <v-list id="user-list" two-line v-else>
    <template v-for="(item, index) in all.items">
      <v-divider
        v-if="item.divider"
        :key="index"
        :inset="item.inset"
      ></v-divider>

      <v-list-item
        v-else
        :key="item.title"
        @click.prevent="() => setSelectedUser(item)"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("users", ["all"]),
  },
  methods: {
    ...mapActions("chat", ["setSelectedUser"]),
  },
};
</script>


<style lang="scss" scoped>
#user-list {
  max-height: 200px;
  padding-left: 4px;
}
</style>