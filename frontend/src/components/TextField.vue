<template>
  <v-container class="mt-9">
    <v-row justify="center" class="searchBox">
      <v-col cols="4">
        <v-text-field @keydown.enter="doSearch" label="言語名" v-model="keyword" single-line></v-text-field>
      </v-col>
      <v-btn @click="doSearch" icon class="mt-7">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TextField",

  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    doSearch() {
      if (!this.keyword) return;
      this.$emit("doSearch", this.keyword);
    }
  }
};
</script>