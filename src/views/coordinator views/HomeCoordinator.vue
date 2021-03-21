<template>
  <v-app>
    <MenuCoordinator />
    <div>
      <Coordinator />
    </div>
  </v-app>
</template>

<script>
import Coordinator from "../../components/coordinator components/HomeCoordinator";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";
export default {
  name: "HomeCoordinator",
  components: {
    Coordinator,
    MenuCoordinator,
  },
};
</script>
