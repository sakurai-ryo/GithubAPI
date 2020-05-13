<template>
  <v-app class="mb-7">
    <TextField @doSearch="doReq" class="mt-9"></TextField>

    <v-container class="mt-4 mb-4">
      <v-row>
        <v-col cols="12" sm="3" v-for="(result,index) of results" :key="index">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="result.node.openGraphImageUrl"
            ></v-img>

            <v-card-title color="black">
              <a :href="result.node.url">{{result.node.name}}</a>
            </v-card-title>

            <v-card-text class="text--primary mt-3">
              <div>Star: {{result.node.stargazers.totalCount}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="toFav(result.node)" color="pink" icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn color="orange" text>
                <a :href="result.node.url">detail</a>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { searchQuery } from "../queries/searchQuery";
import { setFavQuery } from "../queries/setFavQuery";
import { subscriptionFavCreate } from "../queries/subscription";
import TextField from "../components/TextField";
import axios from "axios";

export default {
  name: "Search",
  components: {
    TextField
  },
  data() {
    return {
      results: []
    };
  },
  methods: {
    //GITHUB APIにリクエスト
    doReq(keyword) {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN}`
        }
      };
      const data = {
        query: searchQuery,
        variables: {
          repoName: `language:${keyword}`
        }
      };
      axios
        .post(process.env.VUE_APP_GITHUB_HTTP, data, config)
        .then(snap => {
          this.results = snap.data.data.search.edges;
        })
        .catch(err => {
          throw err;
        });
    },
    //お気に入りのデータをmutation
    toFav(data) {
      this.$apollo
        .mutate({
          mutation: setFavQuery,
          variables: {
            name: data.name,
            openGraphImageUrl: data.openGraphImageUrl,
            stargazers: data.stargazers.totalCount,
            url: data.url
          },
          subscribeToMore: [
            {
              // below is the subscription query.
              document: subscriptionFavCreate,
              updateQuery: (previousResult, { subscriptionData }) => {
                console.log(subscriptionData.data);
                alert(`${subscriptionData.data}を追加しました`); // This returns our SUBSCRIPTION into the data property "items" when there is an update
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