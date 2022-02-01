<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
    />

    <v-text-field
      v-model="user.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required]"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Password"
      counter
      @click:append="showPassword = !showPassword"
    />

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" class="mr-4" @click="resetValidation">
      Reset Validation
    </v-btn>

    <v-btn color="secondary" @click="handleSubmit" :disabled="status.loggingIn">
      Login
      <v-icon right dark> mdi-login </v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
    user: {
      email: "abc@gmail.com",
      password: "Password123",
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showPassword: false,
    passwordRules: {
      required: (v) => !!v || "Password is required.",
    },
    showConfirmationPassword: false,
    submitted: false,
  }),
  methods: {
    ...mapActions("account", ["login", "logout"]),

    validate() {
      this.$refs.loginForm.validate();
    },
    reset() {
      this.$refs.loginForm.reset();
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation();
    },
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
      e.preventDefault();
    },
  },
  computed: {
    ...mapState("account", ["status"]),
  },
};
</script>