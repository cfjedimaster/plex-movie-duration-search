<template>
  <div>
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login Form (Use Plex credentials)</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Login"
              type="text"
              v-model="username"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>

      <v-alert :value="loginError" type="error">Invalid login credentials.</v-alert>
    </v-flex>
  </div>
</template>

<script>
import plex from "../api/plex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loginError: false
    };
  },
  methods: {
    async login() {
      this.loginError = false;
      let result = await plex.login(this.username, this.password);
      if (result.error) {
        this.loginError = true;
      } else {
        // store the user
        this.$store.commit("setUser", result.user);
        // now move on
        this.$router.replace("/selectserver");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
