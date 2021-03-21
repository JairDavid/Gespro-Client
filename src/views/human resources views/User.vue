<template>
  <v-main>
    <MenuHumanResources/>
    <v-container>
      <div class="d-flex flex-row">
        <h1 class="font-weight-black text-h4 mt-2">
          Consulta general de usuarios
          <v-sheet color="black" height="3"></v-sheet>
        </h1>
      </div>
      <UserTable />
    </v-container>
  </v-main>
</template>
<script>
import UserTable from "../../components/human resources components/user/UserTable";
import MenuHumanResources from "../../components/human resources components/MenuHumanResources";

export default {
  name: "User",
  components: {
    UserTable,
    MenuHumanResources
  },
};
</script>