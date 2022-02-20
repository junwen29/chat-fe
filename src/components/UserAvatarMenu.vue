<template>
  <!-- use width auto to take up space required only -->
  <v-container style="width: auto">
    <v-row>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-badge bordered :color="statusColor" overlap dot>
              <v-icon color="grey lighten-1" large> mdi-account </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="blue">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3 class="pt-4">{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.emailAddress }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("account", ["logout"]),
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("websocket", ["isConnecting", "isConnected"]),
    statusColor() {
      return this.isConnected ? "green" : "red";
    },
  },
};
</script>