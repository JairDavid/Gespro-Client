<template>
  <v-main>
    <MenuHumanResources />
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de puestos
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <LaborTable />
    </v-container>
  </v-main>
</template>
<script>
import LaborTable from "../../components/human resources components/labor/LaborTable";
import MenuHumanResources from "../../components/human resources components/MenuHumanResources";
export default {
  name: "Labor",
  components: {
    LaborTable,
    MenuHumanResources,
  },
};
</script>