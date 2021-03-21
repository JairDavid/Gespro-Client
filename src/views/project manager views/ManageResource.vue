<template>
  <v-main>
    <MenuProjectManager />
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de adscrítos
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <ManageResourcesTable />
    </v-container>
  </v-main>
</template>

<script>
import ManageResourcesTable from "../../components/project manager components/attached/ManageResourcesTable";
import MenuProjectManager from "../../components/project manager components/MenuProjectManager";
export default {
  name: "GestionarRecursos",
  components: {
    ManageResourcesTable,
    MenuProjectManager 
  },
};
</script>
