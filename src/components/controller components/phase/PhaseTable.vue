<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <AddPhase />
    </div>
    <v-card>
      <v-card-title>
        Lista de fases
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
        :headers="encabezado"
        :items="item"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:[`item.editar`]="{ item }">
          <v-btn rounded class="greenButton" @click="editar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.eliminar`]="{ item }">
          <v-btn rounded class="yellowButton" @click="eliminar(item)">
            <v-icon class="white--text">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-pencil</v-icon> Modificar fase
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-text-field
            color="red"
            v-model="editDataRow.name"
            outlined
            label="Nombre de la fase"
            prepend-inner-icon="mdi-ballot"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog1 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog1 = false"
          >
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-delete</v-icon> Eliminar fase
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h3 style="text-align: center">
              ¿Estas seguro que deseas eliminar "{{ deleteDataRow.name }}"?
            </h3>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog2 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog2 = false"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddPhase from "../phase/AddPhase";
export default {
  name: "PhaseTable",
  components: {
    AddPhase,
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de las fases", align: "start", value: "name" },
        { text: "Tipo", align: "center", value: "type" },
        { text: "Modificar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      //Lista de objetos que vienen de la API
      item: [
        { name: "Fase planeación", type: "Desarrollo" },
        { name: "Fase inicio", type: "Arquitectura" },
        { name: "Fase documentación", type: "Administración" },
        { name: "Fase contratación", type: "Contaduría" },
        { name: "Fase construcción", type: "Recursos Humanos" },
        { name: "Fase evaluación", type: "Archivero" },
      ],
      //vincula el item del row para accederlo
      editDataRow: {},
      deleteDataRow: {},
      dialog1: false,
      dialog2: false,
    };
  },
  methods: {
    editar(item) {
      this.editDataRow = item;
      this.dialog1 = true;
    },
    eliminar(item) {
      this.deleteDataRow = item;
      this.dialog2 = true;
    },
  },
};
</script>