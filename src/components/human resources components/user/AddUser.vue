<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Añadir usuario
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white">
          <v-icon color="white">mdi-plus-circle</v-icon> Añadir usuario
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <span class="black--text"> Ingrese la curp del empleado existente:</span>
        <v-text-field
          prepend-inner-icon="mdi-alpha-a-circle"
          outlined
          label="Curp"
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
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AddUser",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>