<template>
  <v-main>
    <MenuHumanResources />
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de empleados
          <v-sheet color="black" elevation="" height="3"></v-sheet>
        </h1>
      </div>
      <TableEmploye />
    </v-container>
  </v-main>
</template>
<script>
import TableEmploye from "../../../components/human resources components/employee/TableEmploye";
import MenuHumanResources from "../../../components/human resources components/MenuHumanResources";

export default {
  name: "ConsultTableEmploye",
  components: {
    TableEmploye,
    MenuHumanResources,
  },
};
</script>