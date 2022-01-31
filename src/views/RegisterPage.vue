<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col>
        <RegistrationForm />
      </v-col>
      <v-col />
    </v-row>
  </v-container>
</template>

<script>
import RegistrationForm from "../components/RegistrationForm";

export default {
  name: "Registration Page",
  components: {
    RegistrationForm,
  },
};
</script>