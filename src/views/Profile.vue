<template>
  <v-main>
    <div v-if="this.sessionId == 1">
      <MenuCoordinator />
    </div>
    <div v-else-if="this.sessionId == 2">
      <MenuController />
    </div>
    <div v-else-if="this.sessionId == 3">
      <MenuHumanResources />
    </div>
    <div v-else-if="this.sessionId == 4">
      <MenuProjectManager />
    </div>
    <div v-else-if="this.sessionId == 5">
      <MenuEmploye />
    </div>
    <div>
      <UserProfile />
    </div>
  </v-main>
</template>
<script>
import UserProfile from "../components/UserProfile";
import MenuCoordinator from "../components/coordinator components/MenuCoordinator";
import MenuController from "../components/controller components/MenuController";
import MenuProjectManager from "../components/project manager components/MenuProjectManager";
import MenuHumanResources from "../components/human resources components/MenuHumanResources";
import MenuEmploye from "../components/employe components/MenuEmploye";

export default {
  name: "Profile",
  components: {
    UserProfile,
    MenuCoordinator,
    MenuController,
    MenuProjectManager,
    MenuHumanResources,
    MenuEmploye,
  },
  data() {
    return {
      sessionId: 0,
    };
  },
  methods: {
    getSessionId() {
      const id = localStorage.getItem("sysrl");
      this.sessionId = id;
    },
  },
  mounted() {
    this.getSessionId();
  },
};
</script>