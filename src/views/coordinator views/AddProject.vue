<template>
  <v-main>
    <MenuCoordinator />
    <div>
      <AddProjectForm />
    </div>
  </v-main>
</template>

<script>
import AddProjectForm from "../../components/coordinator components/project/AddProjectForm";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";
export default {
  name: "AddProject",
  components: {
    AddProjectForm,
    MenuCoordinator,
  },
};
</script>