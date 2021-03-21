<template>
  <v-main>
    <MenuProjectManager/>
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de entregables
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <DeliverableProjectTable />
    </v-container>
  </v-main>
</template>
<script>
import DeliverableProjectTable from "../../components/project manager components/checkdeliverable/DeliverableProjectTable";
import MenuProjectManager from "../../components/project manager components/MenuProjectManager";
export default {
  name: "CheckDeliverable",
  components: {
    DeliverableProjectTable,
    MenuProjectManager
  },
};
</script>