<template>
  <v-app>
    <MenuController/>
    <div>
      <Controller />
    </div>
  </v-app>
</template>

<script>
import MenuController from "../../components/controller components/MenuController";
import Controller from "../../components/controller components/HomeController";
export default {
  name: "HomeController",
  components: {
    Controller,
    MenuController
  },
};
</script>
