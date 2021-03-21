<template>
<v-app>
   <MenuCoordinator/>
    <div>
    <UpdateProjectForm/>
  </div>
</v-app>

</template>

<script>
import UpdateProjectForm from "../../components/coordinator components/project/UpdateProjectForm";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";
export default {
  name: "UpdateProject",
  components: {
    UpdateProjectForm,
    MenuCoordinator
  },
};
</script>