<template>
  <v-container>
    <v-row>
      <div id="nav">
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/chats">Chats</router-link>
      </div>
    </v-row>
  </v-container>
</template>

<style lang="scss">
#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>