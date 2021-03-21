<template>
  <v-app>
    
    <div>
      <Controller />
    </div>
  </v-app>
</template>

<script>
import Controller from "../../components/controller components/HomeController";

export default {
  name: "HomeController",
  components: {
    Controller,
  },
};
</script>
