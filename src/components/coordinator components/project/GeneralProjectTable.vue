<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Listado de proyectos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="projects"
        :items-per-page="5"
        :search="search"
      >
        <template v-slot:[`item.detalles`]="{ item }">
          <!--Le enviamos un item al metodo, este item es uno que se saca del arreglo-->
          <v-btn rounded @click="detalles(item)" color="blueButton">
            <v-icon class="white--text">mdi-eye</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.modificar`]="{ item }">
          <v-btn rounded color="greenButton" @click="editar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.eliminar`]="{ item }">
          <v-btn rounded color="yellowButton" @click="eliminar(item)">
            <v-icon class="white--text">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import Notify from "../../../notifications/Notify";
import CoordinatorService from "../../../services/coordinator/CoordinatorService";
export default {
  name: "GeneralProjectTable",
  data() {
    return {
      search: "",
      //Encabezado de la tabla
      //El value debe coincidir con lo que tenga dentro la peticion del response.data
      //Ejemplo: el response trae esto: {name:"ejemplo",clientName:"ejemplo"}
      headers: [
        { text: "Nombre del proyecto", align: "start", value: "name" },
        { text: "Cliente", align: "start", value: "clientName" },
        { text: "Responsable", align: "start", value: "employe.firstName" },
        { text: "CURP del responsable", align: "start", value: "employe.curp" },
        { text: "Detalles", value: "detalles" },
        { text: "Modificar", value: "modificar" },
        { text: "Eliminar", value: "eliminar" },
      ],
      //arreglo de proyectos de la API
      projects: [],
    };
  },
  methods: {
    detalles(item) {
      //recibimos el item y le mandamos solo el ID a una ruta y redireccionamos para que se pueda hacer
      //la peticion desde la otra vista
      this.$router.push("/btnSearchProject/" + item.id);
    },
    editar(item) {
      this.$router.push("/btnUpdateProject/" + item.id);
    },
    eliminar(item) {
      this.$router.push("/btnDeleteProject/" + item.id);
    },
    getAllProjects() {
      //Petición para obtener los proyectos
      CoordinatorService.listAll()
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error
          Notify.error("getData");
        });
    },
  },
  mounted() {
    //Al cargar la vista mandamos a llenar la tabla
    this.getAllProjects();
  },
};
</script>