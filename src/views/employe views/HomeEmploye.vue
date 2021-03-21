<template>
  <v-app>
    <MenuEmploye />
    <div>
      <Employe />
    </div>
  </v-app>
</template>

<script>
import Employe from "../../components/employe components/HomeEmploye";
import MenuEmploye from "../../components/employe components/MenuEmploye";
export default {
  name: "HomeEmploye",
  components: {
    Employe,
    MenuEmploye,
  },
};
</script>
