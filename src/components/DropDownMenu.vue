<template>
  <v-menu>
    <template v-slot:activator="{ attrs, on }">
      <transition name="slide-fade">
        <v-app-bar-nav-icon v-bind="attrs" v-on="on" v-if="!isSearchingUsers">
        </v-app-bar-nav-icon>
      </transition>
      <transition name="slide-fade">
        <v-btn icon @click="clickedBackButton" v-if="isSearchingUsers">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </transition>
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
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions("account", ["logout"]),
    ...mapActions("chat", ["clickedBackButton"]),
  },
  computed: {
    ...mapState("chat", ["isSearchingUsers"]),
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  transform: rotate(-90deg) scaleX(0.75) translate(0.375rem, 0.1875rem);
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>