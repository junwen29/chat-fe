<template>
  <v-container id="MiddleColumn-Header" py-0 pl-0 mx-0 fluid>
    <div>
      <v-toolbar>
        <v-toolbar-title>Middle Column Header</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-badge bordered :color="statusColor" overlap dot>
          <v-icon color="grey lighten-1" large> mdi-account </v-icon>
        </v-badge>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click.prevent="disconnect"
              :disabled="!isWebSocketConnected"
            >
              <v-icon v-bind="attrs" v-on="on">mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Disconnect Web Socket</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click.prevent="connect"
              :disabled="isWebSocketConnected"
            >
              <v-icon v-bind="attrs" v-on="on">mdi-connection</v-icon>
            </v-btn>
          </template>
          <span>Connect Web Socket</span>
        </v-tooltip>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </v-container>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  data: () => ({ isWebSocketConnected: false }),

  methods: {
    async disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.isWebSocketConnected = false;
    },
    async connect() {
      // GET request using fetch with error handling
      this.socket = new SockJS("http://localhost:8000/sessions");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.isWebSocketConnected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/greetings", (tick) => {
            console.log(tick);
            this.received_messages.push(JSON.parse(tick.body).content);
          });
        },
        // if disconnected halftway, this callback will trigger
        (error) => {
          console.log(error);
          const msg = this.isWebSocketConnected
            ? "Lost established connection"
            : "Error connecting to server";
          this.isWebSocketConnected = false;
          alert(msg);
        }
      );
    },
  },

  computed: {
    statusColor() {
      return this.isWebSocketConnected ? "green" : "red";
    },
  },
};
</script>
