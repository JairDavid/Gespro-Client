<template>
  <v-app-bar color="red" dark>
    <div class="d-flex align-center">
      <v-btn rounded color="white" @click="home()">
        <v-img
          alt="Gespro Logo"
          class="shrink"
          contain
          src="../../assets/gespro.svg"
          transition="scale-transition"
          width="100"
        />
      </v-btn>
    </div>

    <v-btn class="ml-4" text rounded @click="gestionarRecursos()">
      Gestionar Recursos
    </v-btn>

    <v-btn class="ml-4" text rounded @click="consultarAvances()">
      Consultar Avances
    </v-btn>

    <v-btn class="ml-4" text rounded @click="consultarEntregables()">
      Consultar Entregables
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="white" rounded @click="profile()">
      <v-icon class="mr-2 black--text">mdi-account-circle</v-icon>
      <span class="mr-2 black--text">Perfil</span>
    </v-btn>

    <v-btn color="white" class="ml-3" rounded @click="logout">
      <v-icon class="mr-2 black--text">mdi-exit-to-app</v-icon>
      <span class="mr-2 black--text">Cerrar Sesión</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MenuProjectManager",
  methods: {
    gestionarRecursos() {
      const path = `/manageResources`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    home() {
      const path = `/homeProjectManager`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    consultarAvances() {
      const path = `/checkProgress`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    consultarEntregables() {
      const path = `/checkDeliverable`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    profile() {
      const path = `/profile`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    ...mapActions(["logout"]),
  },
};
</script>