<template>
  <v-main>
    <MenuCoordinator />
    <v-container>
      <div class="d-flex flex-row pt-2">
        <h1 class="font-weight-black text-h4">
          Consulta general de proyectos
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <GeneralProjectTable />
    </v-container>
  </v-main>
</template>

<script>
import GeneralProjectTable from "../../components/coordinator components/project/GeneralProjectTable";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";
export default {
  name: "GeneralProject",
  components: {
    GeneralProjectTable,
    MenuCoordinator,
  },
};
</script>