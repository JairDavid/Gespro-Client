<template>
  <v-main>
    <MenuProjectManager/>
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta de avances por proyecto
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <ProgressTable />
    </v-container>
  </v-main>
</template>
<script>
import ProgressTable from "../../components/project manager components/progress/ProgressTable";
import MenuProjectManager from "../../components/project manager components/MenuProjectManager";
export default {
  name: "CheckProgress",
  components: {
    ProgressTable,
    MenuProjectManager
  },
};
</script>