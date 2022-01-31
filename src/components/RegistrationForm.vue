<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="15"
      :rules="nameRules"
      label="Display Name"
      required
    />

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required />

    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordRules.min]"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="showPassword = !showPassword"
      required
    />

    <v-text-field
      v-model="confirmationPassword"
      :append-icon="showConfirmationPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[
        confirmationPasswordRules.required,
        confirmationPasswordRules.min,
      ]"
      :type="showConfirmationPassword ? 'text' : 'password'"
      name="confirmationPassword"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="showConfirmationPassword = !showConfirmationPassword"
      required
    />

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" class="mr-4" @click="resetValidation">
      Reset Validation
    </v-btn>

    <v-btn color="secondary" class="mt-4" @click="submit">
      Register
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showPassword: false,
    password: "Password",
    passwordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    showConfirmationPassword: false,
    confirmationPassword: "Password",
    confirmationPasswordRules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      passwordMatch: (v) =>
        v !== this.password ||
        `The password and confirmation password you entered don't match`,
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {},
  },
};
</script>