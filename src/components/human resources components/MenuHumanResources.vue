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

    <v-btn class="ml-4" text rounded @click="consultaUsuario()">
      Gestionar usuarios
    </v-btn>
    <v-btn class="ml-4" text rounded @click="consultarPuesto()">
      Gestionar puestos
    </v-btn>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-4" text rounded dark v-bind="attrs" v-on="on">
            Gestionar empleado
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
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-spacer></v-spacer>
    <v-btn color="white" rounded @click="profile()">
      <v-icon class="mr-2 black--text">mdi-account-circle</v-icon>
      <span class="mr-2 black--text">Perfil</span>
    </v-btn>

    <v-btn color="white" class="ml-3" rounded>
      <v-icon class="mr-2 black--text">mdi-exit-to-app</v-icon>
      <span class="mr-2 black--text">Cerrar Sesión</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    items: [
      {
        icon: "mdi-plus-circle-outline",
        text: "Añadir empleado",
        route: "/addEmploye",
      },
      {
        text: "Eliminar empleado",
        route: "/deleteEmploye",
        icon: "mdi-minus-circle-outline",
      },
      {
        icon: "mdi-pencil-circle-outline",
        text: "Modificar empleado",
        route: "/updateEmploye",
      },
      {
        icon: "mdi-magnify",
        text: "Buscar empleado",
        route: "/consultEmploye",
      },
      {
        icon: "mdi-magnify",
        text: "Consulta general de empleados",
        route: "/consultAll",
      },
    ],
  }),
  methods: {
    consultaUsuario() {
      const path = `/user`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    consultarPuesto() {
      const path = `/labor`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    home() {
      const path = `/homeHumanResources`;
      if (this.$route.path !== path) this.$router.push(path);
    },
    profile() {
      const path = `/profile`;
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
};
</script>