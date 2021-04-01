<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <AddDeliverable @charge="getAllDeliverables" />
    </div>
    <v-card>
      <v-card-title>
        Lista de entregables
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

    <v-dialog v-model="dialog1" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-pencil</v-icon> Modificar Entregable
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-text-field
            color="red"
            v-model="editDataRow.name"
            outlined
            label="Nombre del entregable"
            prepend-inner-icon="mdi-ballot"
          ></v-text-field>
          <v-file-input
            outlined
            :placeholder="editDataRow.originalName"
            v-model="currentFile"
            color="red"
            prepend-icon=""
            @change="getFile"
            prepend-inner-icon="mdi-paperclip"
          ></v-file-input>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="(dialog1 = false), getAllDeliverables()"
          >
            Cancelar
          </v-btn>
          <v-btn elevation="2" color="green darken-1" text @click="upload()">
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-delete</v-icon> Eliminar entregable
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h3 style="text-align: center">
              ¿Estas seguro que deseas eliminar el entregable "{{
                deleteDataRow.name
              }}"?
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
            @click="deleteDeliverable()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddDeliverable from "../deliverable/AddDeliverable";
import DeliverableService from "../../../services/controller/service/DeliverableService";
import Notify from "../../../notifications/Notify";
export default {
  name: "DeliveableTable",
  components: {
    AddDeliverable,
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de los entregables", align: "start", value: "name" },
        { text: "Modificar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      item: [],
      //vincula el item del row para accederlo
      editDataRow: {},
      deleteDataRow: {},
      dialog1: false,
      dialog2: false,
      currentFile: undefined,
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
    deleteDeliverable() {
      DeliverableService.delete(this.deleteDataRow.id)
        .then((response) => {
          //Toast de hecho
          Notify.done("deleteDeliverabla");
          this.getAllDeliverables();
          this.dialog2 = false;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al eliminar
          Notify.error("deleteData");
        });
    },
    getAllDeliverables() {
      DeliverableService.listAll()
        .then((response) => {
          this.item = response.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },
    upload() {
      if (this.editDataRow.name === "") {
        Notify.fillFields("form-phase");
      } else {
        if (!this.currentFile) {
          DeliverableService.existName(this.editDataRow.name).then(
            (response) => {
              if (response.data === true) {
                Notify.fillFields("valid-deliverable");
              } else {
                DeliverableService.updateName(
                  this.editDataRow.id,
                  this.editDataRow.name
                )
                  .then((response) => {
                    Notify.done("updateDeliverable");
                    this.currentFile = undefined;
                    this.editDataRow.name = "";
                    this.getAllDeliverables();
                    this.dialog1 = false;
                  })
                  .catch((e) => {
                    console.log(e);
                    Notify.error("saveData");
                  });
              }
            }
          );
        } else {
          const formData = new FormData();
          formData.append(`json`, `{"name":"${this.editDataRow.name}"}`);
          formData.append("archivo", this.currentFile);
          DeliverableService.update(formData, this.editDataRow.id)
            .then((response) => {
              Notify.done("updateDeliverable");
              this.currentFile = undefined;
              this.editDataRow.name = "";
              this.getAllDeliverables();
              this.dialog1 = false;
            })
            .catch((e) => {
              console.log(e);
              Notify.error("saveData");
            });
        }
      }
    },
    getFile(e) {
      this.currentFile = e;
    },
  },
  mounted() {
    this.getAllDeliverables();
  },
};
</script>