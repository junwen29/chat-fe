<template>
  <v-menu>
    <template v-slot:activator="{ attrs, on }">
      <v-app-bar-nav-icon v-bind="attrs" v-on="on"> </v-app-bar-nav-icon>
    </template>
    <v-list>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon v-text="'mdi-logout'"></v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="'Logout'"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    items: ["Register", "Login"].map((v) => `Item ${v}`),
  }),
  methods: {
    ...mapActions("account", ["logout"]),
  },
};
</script>