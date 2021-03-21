<template>
  <v-app>
    <MenuHumanResources/>
    <div>
      <HumanResources />
    </div>
  </v-app>
</template>

<script>
import HumanResources from "../../components/human resources components/HomeHumanResources";
import MenuHumanResources from "../../components/human resources components/MenuHumanResources";
export default {
  name: "HomeHumanResources",
  components: {
    HumanResources,
    MenuHumanResources
  },
};
</script>
