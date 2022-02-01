<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col>
        <LoginForm />
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