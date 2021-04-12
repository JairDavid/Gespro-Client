<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de entregables
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Nombre del archivo"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <div align="center">
        <v-data-table :headers="headers" :items="proyectos" :search="search">
          <template v-slot:[`item.entregables`]="{ item }">
            <v-btn
              rounded
              color="greenButton"
              dark
              @click="verEntregables(item)"
            >
              <v-icon> mdi-eye </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-dialog v-model="dialog" persistent width="800">
      <v-card>
        <v-card-title>
          <v-btn
            color="greenButton"
            class="white--text"
            style="margin-right: 1%"
            rounded
            @click="(dialog = false), limpiar()"
          >
            <v-icon class="white--text">mdi-arrow-left-thick</v-icon>
          </v-btn>
          Entregables de: {{ seeDataRow.name }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchTable"
            append-icon="mdi-magnify"
            label="Buscar"
            color="red"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="encabezado"
          :items="entregables"
          :search="searchTable"
        >
          <template v-slot:[`item.descargar`]="{ item }">
            <v-btn rounded color="blueButton" dark @click="descargar(item.id)">
              <v-icon> mdi-cloud-download </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProjectService from "../../../services/projectManager/service/ProjectService";
import ProgressService from "../../../services/projectManager/service/ProjectPhaseService";
import DeliverableAssigmentService from "../../../services/projectManager/service/DeliverableAssigmentService";
import axios from "axios";
export default {
  name: "DeliverableProjectTable",
  data() {
    return {
      search: "",
      headers: [
        { text: "Proyecto", align: "start", value: "name" },
        { text: "Ver entregables", value: "entregables" },
      ],
      encabezado: [
        { text: "Entregable", aling: "center", value: "name" },
        { text: "Descargar", value: "descargar" },
      ],
      proyectos: [],
      fases: [],
      entregables: [],
      dataFases: [],

      dialog: false,
      seeDataRow: {},
      searchTable: "",
    };
  },
  methods: {
    limpiar() {
      this.entregables = [];
      this.searchTable = "";
    },

    //Carga todos los proyectos a la vista
    getAllProyects() {
      ProjectService.getAll()
        .then((response) => {
          this.proyectos = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Obtiene todas las fases dependiendo del tipo de proyecto
    verEntregables(item) {
      let id = 0;
      let idPhase = 0;
      this.dialog = true;
      this.seeDataRow = item;
      id = this.seeDataRow.type.id;

      ProgressService.searchIdProject(id)
        .then((response) => {
          this.fases = response.data;

          // Obtiene todos los entregables que contienen las fases
          this.fases.map((item, i) => {
            idPhase = item.id;
            DeliverableAssigmentService.searchDeliverable(idPhase)
              .then((response) => {
                this.dataFases = response.data;

                // Obtenemos solo los objetos de entregables que trae la data de "dataFases"
                this.dataFases.map((item, j) => {
                  this.entregables.push(item.deliverable);
                });
              })
              .catch((e) => {
                console.log(e);
              });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Descarga del entregable

    descargar(identregable) {
      const token = localStorage.getItem("accessToken");
      axios({
        url: "http://100.25.145.27:2000/entregable/descargar/" + identregable,
        method: "GET",
        responseType: "blob", // important
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          let disposition = response.headers["content-disposition"]; // Obtener contenido-disposición
          let fileInfo = disposition
            ? disposition.substr(disposition.indexOf("filename")) //saca el filename
            : "";
          let name = fileInfo ? fileInfo.split("=")[1] : "";
          let fileName = name.replace('"', ""); //le quita la primer "
          // BLOB NAVIGATOR
          const url = window.URL.createObjectURL(new Blob([response.data])); //genera el blob
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName.replace('"', "")); //le quita el último ", manda el nombre del archivo
          document.body.appendChild(link);
          link.click();
        })
        .catch((e) => {
          console.log(e);
          Notify.error("getData");
        });
    },
  },
  mounted() {
    this.getAllProyects();
  },
};
</script>
