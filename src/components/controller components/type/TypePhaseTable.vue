<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn rounded class="blueButton" dark v-bind="attrs" v-on="on" @click="getAllPhases()">
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
          :items="phase"
          :search="search"
          :items-per-page="5"
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TypePhaseService from "../../../services/controller/service/TypePhaseService";
export default {
  name: "TypePhaseTable",
  props: {
    dataExtern: {},
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de la fase", align: "start", value: "phase.name" },
      ],
      phase: [],
      dialog: false,
    };
  },
  methods: {
    getAllPhases(){
      TypePhaseService.getType(this.dataExtern.id)
      .then((response)=>{
        this.phase=response.data;
      })
      .catch((e)=>{
        console.log(e);
      })
    }
  },
};
</script>