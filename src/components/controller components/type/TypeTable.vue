<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <AddType />
      <v-btn rounded color="blueButton" dark class="mx-2" @click="fillType()">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Asignar elementos
      </v-btn>
    </div>
    <v-card>
      <v-card-title>
        Lista de tipos
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
        <template v-slot:[`item.ver`]="{ item }">
          <TypePhaseTable :dataExtern="item" />
        </template>

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
        <v-card-title class="red">
          <span class="headline" style="color: white"> Modificar Tipo </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              style="margin-top: 10%"
              color="red"
              v-model="editDataRow.name"
              outlined
              label="Nombre de la fase"
              prepend-inner-icon="mdi-ballot"
            ></v-text-field>
          </v-container>
        </v-card-text>
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
          <span class="headline" style="color: white"> Eliminar Tipo </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <br />
            <h3 style="text-align: center">
              ¿Estas seguro que deseas eliminar "{{ deleteDataRow.name }}"?
            </h3>
          </v-container>
        </v-card-text>
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
import TypePhaseTable from "./TypePhaseTable";
import AddType from "./AddType";
import ControllerService from "../../../services/controller/service/ControllerService";
export default {
  name: "TypeTable",
  components: {
    TypePhaseTable,
    AddType,
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre del tipo de proyecto", align: "start", value: "name" },
        { text: "Ver fases", align: "center", value: "ver" },
        { text: "Modificar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      item: [],
      deleteDataRow: {},
      editDataRow: {},
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
    getAllTypes() {
      ControllerService.listAll()
        .then((response) => {
          this.item=response.data;
        })
        .catch((e) => {
          console.log(e);

        });
    },
    fillType() {
      this.$router.replace("/fillType");
    },
  },
  mounted(){
    this.getAllTypes();
  }
};
</script>