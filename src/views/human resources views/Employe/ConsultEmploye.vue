<template>
  <v-main>
    <MenuHumanResources />
    <div>
      <ConsultEmployeForm />
    </div>
  </v-main>
</template>
<script>
import ConsultEmployeForm from "../../../components/human resources components/employee/ConsultEmployeForm";
import MenuHumanResources from "../../../components/human resources components/MenuHumanResources";

export default {
  name: "ConsultEmploye",
  components: {
    ConsultEmployeForm,
    MenuHumanResources
  },
};
</script>