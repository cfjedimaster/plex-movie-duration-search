<template>

<v-app dark>
  <v-toolbar app>
    <v-toolbar-title>Plex Movie Duration Search</v-toolbar-title>
  </v-toolbar>
  <v-content>
      <v-container fluid>
          <v-layout align-center justify-center>
            <router-view></router-view>
          </v-layout>
          <!--
            <router-view></router-view>
          -->
      </v-container>
  </v-content>
  
</v-app>

</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
