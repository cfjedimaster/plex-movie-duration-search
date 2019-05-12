<template>
  <div>
    <h1>Movies</h1>

    <v-subheader>Min and max duration in minutes:</v-subheader>
    <v-layout row>
      <v-flex shrink style="width: 60px">
        <v-text-field v-model="duration[0]" class="mt-0" hide-details single-line type="number"></v-text-field>
      </v-flex>

      <v-flex class="px-3">
        <v-range-slider v-model="duration" :max="500" :min="30" :step="10"></v-range-slider>
      </v-flex>

      <v-flex shrink style="width: 60px">
        <v-text-field v-model="duration[1]" class="mt-0" hide-details single-line type="number"></v-text-field>
      </v-flex>
    </v-layout>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs4 d-flex v-for="movie in filteredMovies" :key="movie.key">
          <v-card>
            <v-img :src="movie.poster"/>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{movie.title}}</h3>
                <div>{{movie.tagline}}</div>
                <div>{{movie.duration | durationDisplay }}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import plex from "../api/plex";

export default {
  name: "Main",
  data() {
    return {
      duration: [30, 500],
      movies: []
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(m => {
        let minS = this.duration[0] * 60 * 1000;
        let maxS = this.duration[1] * 60 * 1000;
        return m.duration > minS && m.duration < maxS;
      });
    }
  },
  async mounted() {
    let user = this.$store.state.user;
    let server = this.$store.state.server;
    this.movies = await plex.getMovies(user, server);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 250px;
  max-height: 250px;
}
</style>
