<template>
  <v-menu>
    <template v-slot:activator="{ attrs, on }">
      <v-app-bar-nav-icon v-bind="attrs" v-on="on" />
    </template>

    <v-list>
      <v-list-item v-for="item in items" :key="item" link>
        <v-list-item-title v-text="item"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: ["Register", "Login"].map((v) => `Item ${v}`),
  }),
};
</script>