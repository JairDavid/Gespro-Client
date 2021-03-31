<template>
<v-main>
  <MenuController/>
    <v-container>
    <div class="d-flex flex-row">
      <h1 class="font-weight-black text-h4 mt-2">
        Consulta general de tipos de proyecto
        <v-sheet color="black" elevation="" height="3"></v-sheet>
      </h1>
    </div>
    <TypeTable />
  </v-container>
</v-main>

</template>
<script>
import TypeTable from "../../components/controller components/type/TypeTable";
import MenuController from "../../components/controller components/MenuController";
export default {
  name: "Type",
  components: {
    TypeTable,
    MenuController
  },
};
</script>