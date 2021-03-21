<template>
  <v-main>
    <MenuEmploye />
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta General de Proyectos Asignados
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <UpDownTable />
    </v-container>
  </v-main>
</template>

<script>
import UpDownTable from "../../components/employe components/evidence/UpDownTable";
import MenuEmploye from "../../components/employe components/MenuEmploye";
export default {
  name: "DeliverableUpDown",
  components: {
    UpDownTable,
    MenuEmploye,
  },
};
</script>