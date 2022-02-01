<template>
  <v-app>
    <v-main>
      <v-snackbar v-model="showSnackBar">
        {{ alert.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="clearAlert">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
    showSnackBar: {
      get: function () {
        return this.alert.message ? true : false;
      },
      set: function (newValue) {
        return newValue;
      },
    },
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    $route() {
      // clear alert on location change
      this.clearAlert();
    },
  },
};
</script>