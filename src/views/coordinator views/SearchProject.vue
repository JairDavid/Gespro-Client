<template>
<v-app>
   <MenuCoordinator/>
    <div>
    <SearchProjectForm/>
  </div>
</v-app>

</template>

<script>
import SearchProjectForm from "../../components/coordinator components/project/SearchProjectForm";
import MenuCoordinator from "../../components/coordinator components/MenuCoordinator";

export default {
  name: "SearchProject",
  components: {
    SearchProjectForm,
     MenuCoordinator
  },
};
</script>