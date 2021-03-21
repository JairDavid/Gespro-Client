<template>
  <v-main>
    <MenuCoordinator />
    <div>
      <DeleteProjectForm />
    </div>
  </v-main>
</template>

<script>
import DeleteProjectForm from "../../components/coordinator components/project/DeleteProjectForm";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";
export default {
  name: "DeleteProject",
  components: {
    DeleteProjectForm,
    MenuCoordinator,
  },
};
</script>