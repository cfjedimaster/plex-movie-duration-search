<template>
  <div>
    <h1>Select Server</h1>
    <p>
      Enter the IP address of your server:
    </p>
    <v-text-field v-model="server"
            label="ip address"
            required
    ></v-text-field>
    <v-btn color="info" @click="setServer">Set Server</v-btn>

    <v-alert :value="serverError" type="error">
      Please specify a server.
    </v-alert>

  </div>
</template>

<script>
export default {
  name: "SelectServer",
  data() {
    return {
      server: "",
      serverError: false
    };
  },
  methods: {
    setServer() {
      this.serverError = false;
      if (this.server === "") {
        this.serverError = true;
      } else {
        this.$store.commit("setServer", this.server);
        this.$router.replace("/main");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
