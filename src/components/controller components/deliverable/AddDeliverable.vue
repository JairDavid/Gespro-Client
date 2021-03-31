<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Agregar entregable
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white">
          <v-icon color="white">mdi-plus-circle</v-icon> Añadir entregable
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-text-field
          color="red"
          outlined
          label="Nombre del entregable"
          prepend-inner-icon="mdi-ballot"
          v-model="deliverable.name"
        ></v-text-field>
        <v-file-input
          v-model="currentFile"
          @change="getFile"
          label="Archivo"
          outlined
          color="red"
          prepend-icon=""
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
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn elevation="2" color="green darken-1" text @click="upload()">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Notify from "../../../notifications/Notify";
import DeliverableService from "../../../services/controller/service/DeliverableService";
export default {
  name: "AddDeliverable",
  data() {
    return {
      deliverable: {
        id: null,
        name: "",
      },
      dialog: false,
      currentFile: undefined,
    };
  },
  methods: {
    upload() {
      if (!this.currentFile || this.deliverable.name === "") {
        Notify.fillFields("uploadFile");
      } else {
        DeliverableService.existName(this.deliverable.name)
          .then((response) => {
            if (response.data===true) {
              Notify.fillFields("valid-deliverable");
            } else {
              const formData = new FormData();
              formData.append(`json`, `{"name":"${this.deliverable.name}"}`);
              formData.append("archivo", this.currentFile);
              DeliverableService.save(formData)
                .then((response) => {
                  Notify.done("deliverable");
                  this.currentFile = undefined;
                  this.deliverable.name = "";
                  this.charge();
                  this.dialog = false;
                })
                .catch((e) => {
                  console.log(e);
                  Notify.error("saveData");
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getFile(e) {
      this.currentFile = e;
    },
    charge() {
      this.$emit("charge");
    },
  },
};
</script>