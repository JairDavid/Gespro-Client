<template>
  <v-main>
    <MenuHumanResources />
    <div>
      <ModifyEmployeForm />
    </div>
  </v-main>
</template>
<script>
import ModifyEmployeForm from "../../../components/human resources components/employee/ModifyEmployeForm";
import MenuHumanResources from "../../../components/human resources components/MenuHumanResources";
export default {
  name: "ModifyEmploye",
  components: {
    ModifyEmployeForm,
    MenuHumanResources,
  },
};
</script>