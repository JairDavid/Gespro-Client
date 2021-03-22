<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Agregar fase
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white">
          <v-icon color="white">mdi-plus-circle</v-icon> Añadir fase
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-container>
          <v-text-field
            color="red"
            v-model="phase.name"
            outlined
            label="Nombre de la fase"
            prepend-inner-icon="mdi-ballot"
          ></v-text-field>
        </v-container>
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
  name: "AddPhase",
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
  methods: {},
};
</script>