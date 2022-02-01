<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col>
        <LoginForm />
      </v-col>
      <v-col />
    </v-row>

    <v-row>
      <v-col />
      <v-col>
        Do not have an account? 
        <router-link to="/register">Register</router-link>
      </v-col>
      <v-col />
    </v-row>

  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>