<template>
  <v-main>
    <MenuController/>
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de fases
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <PhaseTable />
    </v-container>
  </v-main>
</template>
<script>
import MenuController from "../../components/controller components/MenuController";
import PhaseTable from "../../components/controller components/phase/PhaseTable";
export default {
  name: "Phase",
  components: {
    PhaseTable,
    MenuController
  },
};
</script>