<template>
  <v-main>
    <MenuController />
    <v-container>
      <FillNewType />
    </v-container>
  </v-main>
</template>

<script>
import FillNewType from "../../components/controller components/type/FillNewType";
import MenuController from "../../components/controller components/MenuController";
export default {
  name: "FillType",
  components: {
    FillNewType,
    MenuController,
  },
};
</script>

<style>
</style>