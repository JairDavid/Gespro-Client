<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        agregar tipo
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white"
          ><v-icon left class="white--text">mdi-plus-circle</v-icon> Agregar
          tipo
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-text-field
          color="red"
          outlined
          label="Nombre del tipo "
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
</template>
<script>
import Notify from '../../../notifications/Notify';
import ControllerService from "../../../services/controller/ControllerService";
export default {
  name: "",
  data() {
    return {
      type: {
        id: null, //verificar que no mande errores a la API
        name: "",
      },
      dialog: false,
    };
  },
  methods: {
    saveType() {
      if (this.type.name === "") {
        Notify.fillFields("");
      } else {
        ControllerService.save(this.type);
      }
    },
  },
};
</script>