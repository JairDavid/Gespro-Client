<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de empleados
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
      <v-data-table :headers="headers" :items="item" :search="search">
        <template v-slot:[`item.anadir`]="{ item }">
          <v-btn
            rounded
            color="blueButton"
            width="40%"
            dark
            @click="anadir(item)"
          >
            <v-icon> mdi-plus-circle </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.ver`]="{ item }">
          <SeeAttachedResource :dataExtern="item" />
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-plus-circle</v-icon> Añadir a un proyecto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <v-select
              color="red"
              prepend-inner-icon="mdi-briefcase"
              :items="['SIDEC', 'GACU', 'GESPRO']"
              label="Proyecto"
              outlined
            >
            </v-select>
            <v-select
              color="red"
              prepend-inner-icon="mdi-briefcase"
              :items="['Tester', 'Programador', 'Diseñador']"
              label="Puesto"
              outlined
            >
            </v-select>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SeeAttachedResource from "../attached/SeeAttachedResource";
export default {
  name: "ManageResourcesTable",
  components: {
    SeeAttachedResource,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Curp", align: "start", value: "curp" },
        { text: "Nombre", align: "center", value: "nombre" },
        { text: "Direccion", align: "center", value: "direccion" },
        { text: "Añadir", align: "center", value: "anadir" },
        { text: "Ver proyectos asignados", align: "center", value: "ver" },
      ],
      item: [
        {
          curp: "LOZ00016MRSPTZ",
          nombre: "Gustavo Lopez",
          direccion: "Jiutepec",
        },
        {
          curp: "ZPOST77782HHSS",
          nombre: "Jair Vazquez",
          direccion: "3 de mayo",
        },
      ],
      dialog: false,
      addDataRow: {},
    };
  },
  methods: {
    ConsultarProyectos() {
      this.$router.push("/consultarProyectos");
    },
    anadir(item) {
      this.dialog = true;
      this.addDataRow = item;
    },
  },
};
</script>