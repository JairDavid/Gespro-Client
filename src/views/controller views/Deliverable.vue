<template>
  <v-main>
    <MenuController />
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de entregables
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <DeliverableTable />
    </v-container>
  </v-main>
</template>
<script>
import MenuController from "../../components/controller components/MenuController";
import DeliverableTable from "../../components/controller components/deliverable/DeliverableTable";
export default {
  name: "Deliverable",
  components: {
    DeliverableTable,
    MenuController,
  },
};
</script>