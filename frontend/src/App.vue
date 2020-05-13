<template>
  <v-app>
    <v-container>
      <v-app-bar absolute color="teal lighten-3">
        <v-toolbar-title>RepoSearch</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn to="/search" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn to="/favorites" icon color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-app-bar>
    </v-container>

    <router-view></router-view>

    <v-footer absolute class="font-weight-medium text-center" color="teal lighten-3">
      <v-col class="text-center" style="text-align:center" cols="12">
        <strong>RepoSearch</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
