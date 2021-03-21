<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Añadir puesto
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white">
          <v-icon color="white">mdi-plus-circle</v-icon> Añadir puesto
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <span class="black--text"> Ingrese el nombre del puesto:</span>
        <v-text-field
          prepend-inner-icon="mdi-briefcase"
          outlined
          label="Puesto"
          color="red"
          class="mt-2"
        >
        </v-text-field>
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
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AddLabor",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>