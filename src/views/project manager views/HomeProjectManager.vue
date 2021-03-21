<template>
  <v-app>
    <MenuProjectManager/>
    <div>
      <HomeProjectManager />
    </div>
  </v-app>
</template>

<script>
import HomeProjectManager from "../../components/project manager components/HomeProjectManager";
import MenuProjectManager from "../../components/project manager components/MenuProjectManager";
export default {
  name: "ProjectManager",
  components: {
    HomeProjectManager,
    MenuProjectManager
  },
};
</script>
