<template>
  <v-main>
    <MenuHumanResources />
    <div>
      <AddEmployeForm />
    </div>
  </v-main>
</template>
<script>
import AddEmployeForm from "../../../components/human resources components/employee/AddEmployeForm";
import MenuHumanResources from "../../../components/human resources components/MenuHumanResources";
export default {
  name: "AddEmploye",
  components: {
    AddEmployeForm,
    MenuHumanResources,
  },
};
</script>