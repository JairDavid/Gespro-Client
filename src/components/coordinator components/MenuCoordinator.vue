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

    <v-menu offset-y class="ml-4">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-4" text dark rounded v-bind="attrs" v-on="on">
          Gestionar proyectos
          <v-icon class="mr-2 white--text">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list rounded>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          router
          :to="item.route"
        >
          <v-icon class="mr-2" color="red">{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn class="ml-4" text rounded @click="consultaGeneral()">
      Consultas generales
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
  name: "MenuCoordinator",
  data: () => ({
    items: [
      {
        title: "Añadir proyecto",
        route: "/addProject",
        icon: "mdi-plus-circle-outline",
      },
      {
        title: "Eliminar proyecto",
        route: "/deleteProject",
        icon: "mdi-minus-circle-outline",
      },
      {
        title: "Buscar proyecto",
        route: "/searchProject",
        icon: "mdi-magnify",
      },
      {
        title: "Modificar proyecto ",
        route: "/updateProject",
        icon: "mdi-pencil-circle-outline",
      },
    ],
  }),
  methods: {
    home() {
      const path = `/homeCoordinator`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    profile() {
      const path = `/profile`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    consultaGeneral() {
      const path = `/generalProject`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    ...mapActions(["logout"]),
  },
};
</script>