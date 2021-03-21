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

    <v-btn color="white" class="ml-3" rounded @click="logout()">
      <v-icon class="mr-2 black--text">mdi-exit-to-app</v-icon>
      <span class="mr-2 black--text">Cerrar Sesión</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "MenuProjectManager",
  methods: {
    gestionarRecursos() {
      this.$router.push("/manageResources");
    },
    home() {
      this.$router.push("/homeProjectManager");
    },
    consultarAvances() {
      this.$router.push("/checkProgress");
    },
    consultarEntregables() {
      this.$router.push("/checkDeliverable");
    },
    profile() {
      this.$router.push("/profile");
    },
    logout() {
      this.$router.replace("/");
    },
  },
};
</script>