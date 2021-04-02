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
          @click="dialog = false, clean();"
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
      //objeto
      deliverable: {
        id: null,
        name: "",
      },
      dialog: false,

      //donde se guardará el archivo
      currentFile: undefined,
    };
  },
  methods: {
    clean() {
      //limpieza de inputs
      this.currentFile = undefined;
      this.deliverable.name = "";
    },
    upload() {
      //validación: si el archivo no tiene contenido (no ha sido seleccionado) o si el nombre está vacío
      //se manda un mensaje para que se llenen
      if (!this.currentFile || this.deliverable.name === "") {
        Notify.fillFields("uploadFile");
      } else {
        //se valida que el nombre no sea repetido (petición en API)
        DeliverableService.existName(this.deliverable.name)
          .then((response) => {
            if (response.data === true) {
              Notify.fillFields("valid-deliverable"); //mensaje de que el nombre ya esxiste
            } else {
              const formData = new FormData();
              formData.append(`json`, `{"name":"${this.deliverable.name}"}`); //se agrega el json
              formData.append("archivo", this.currentFile); //se agrega el archivo
              DeliverableService.save(formData)
                .then((response) => {
                  Notify.done("deliverable");
                  this.clean();
                  //se manda a renderizar nuevamente la lista del $emit
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
      //se recibe el método de la vista que llama al componente
      //se recibe con el nombre charge
      this.$emit("charge");
    },
  },
};
</script>