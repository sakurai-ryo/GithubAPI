<template>
  <v-app class="mt-4 mb-4">
    <v-container class="mt-4 mb-4 mt-9 mb-9">
      <v-row>
        <v-col cols="12" sm="3" v-for="(fav,index) of favs" :key="index">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="fav.openGraphImageUrl"></v-img>

            <v-card-title color="black">
              <a :href="fav.url">{{fav.name}}</a>
            </v-card-title>

            <v-card-text class="text--primary mt-3">
              <div>Star: {{fav.stargazers}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="deleteFav(fav.id)" color="pink" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn color="orange" text>
                <a :href="fav.url">detail</a>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { getFavQuery } from "../queries/getFavQuery";
import { deleteFavQuery } from "../queries/deletFavQuery";
import { subscriptionFavDelete } from "../queries/subscription";

export default {
  name: "Fav",
  data() {
    return {
      favs: []
    };
  },
  created() {
    if (this.favs.length > 0) this.favs.length = 0;
    this.getFav();
  },
  methods: {
    getFav() {
      this.$apollo
        .query({
          query: getFavQuery
        })
        .then(res => {
          this.favs = res.data.favorites;
        })
        .catch(console.log);
    },
    async deleteFav(id) {
      await this.$apollo
        .mutate({
          mutation: deleteFavQuery,
          variables: {
            id: id
          },
          subscribeToMore: [
            {
              document: subscriptionFavDelete,
              updateQuery: (previousResult, { subscriptionData }) => {
                console.log(1);
                console.log(subscriptionData);
                return subscriptionData.data;
              }
            }
          ]
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(console.log);
    }
  }
};
</script>