<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn rounded class="blueButton" dark v-bind="attrs" v-on="on">
          <v-icon class="white--text">mdi-eye</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-btn
            color="greenButton"
            class="white--text"
            style="margin-right: 1%"
            rounded
            @click="dialog = false"
          >
            <v-icon class="white--text">mdi-arrow-left-thick</v-icon>
          </v-btn>
          Fases de: {{ dataExtern.name }}
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
          :items="tipos"
          :search="search"
          :items-per-page="5"
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "TypePhaseTable",
  props: {
    dataExtern: {},
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de la fase", align: "start", value: "name" },
      ],
      tipos: [
        { name: "Fase planeación" },
        { name: "Fase inicio" },
        { name: "Fase documentación" },
        { name: "Fase contratación" },
        { name: "Fase construcción" },
        { name: "Fase evaluación" },
      ],
      dialog: false,
    };
  },
  methods: {},
};
</script>