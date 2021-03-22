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
          label="Nombre de la fase"
          prepend-inner-icon="mdi-ballot"
        ></v-text-field>
        <v-file-input
          accept="image/*"
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
export default {
  name: "AddDeliverable",
  data() {
    return {
      phase: {
        id: null, //verificar que no mande errores a la API
        name: "",
        type: "",
      },
      dialog: false,
    };
  },
};
</script>