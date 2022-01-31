<template>
  <v-form ref="registerForm" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.name"
      :counter="15"
      :rules="nameRules"
      label="Display Name"
      required
    />

    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
    />

    <v-text-field
      v-model="user.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordRules.min]"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="showPassword = !showPassword"
    />

    <v-text-field
      v-model="user.confirmationPassword"
      :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordConfirmationRule]"
      :type="showConfirmationPassword ? 'text' : 'password'"
      name="confirmationPassword"
      label="Confirmation"
      hint="At least 8 characters"
      counter
      @click:append="showConfirmationPassword = !showConfirmationPassword"
    />

    <v-spacer></v-spacer>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" class="mr-4" @click="resetValidation">
      Reset Validation
    </v-btn>

    <v-btn
      color="secondary"
      class="mt-4"
      @click="handleSubmit"
      :disabled="status.registering"
    >
      Register
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
    user: {
      name: "abc",
      email: "abc@gmail.com",
      password: "Password123",
      confirmationPassword: "Password123",
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
      required: (v) => !!v || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
    showConfirmationPassword: false,
    submitted: false,
  }),
  methods: {
    ...mapActions("account", ["register"]),
    validate() {
      this.$refs.registerForm.validate();
    },
    reset() {
      this.$refs.registerForm.reset();
    },
    resetValidation() {
      this.$refs.registerForm.resetValidation();
    },
    handleSubmit(e) {
      this.submitted = true;
      const isValid = this.$refs.registerForm.validate();
      if (isValid) {
        this.register(this.user);
      }
      e.preventDefault();
    },
  },
  computed: {
    ...mapState("account", ["status"]),
    passwordConfirmationRule() {
      return () =>
        this.user.password === this.user.confirmationPassword || "Password must match";
    },
  },
};
</script>