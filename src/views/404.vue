<template>
  <div class="red">
    <v-row>
      <v-col cols="12" class="mt-5">
        <v-card>
          <v-img
            max-width="1000"
            max-height="1500"
            src="../assets/warning404.png"
            class="mx-auto"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-row class="pb-4" align="center" justify="center">
          <v-btn color="white" class="ml-3" rounded @click="logout"
            ><v-icon class="mr-2 black--text">mdi-exit-to-app</v-icon>
            <span class="mr-2 black--text">Ir al login</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Warning404",
  methods: {
    ...mapActions(["logout"]),
    deleteData() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("sysrl");
      localStorage.removeItem("sysin");
    },
  },
  mounted() {
    this.deleteData();
  },
};
</script>

<style>
</style>