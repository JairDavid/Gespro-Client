<template>
  <v-main>
      <MenuHumanResources/>
    <div>
      <DeleteEmployeForm />
    </div>
  </v-main>
</template>

<script>
import DeleteEmployeForm from "../../../components/human resources components/employee/DeleteEmployeForm";
import MenuHumanResources from "../../../components/human resources components/MenuHumanResources";
export default {
  name: "DeleteEmploye",
  components: {
    DeleteEmployeForm,
    MenuHumanResources,
  },
};
</script>