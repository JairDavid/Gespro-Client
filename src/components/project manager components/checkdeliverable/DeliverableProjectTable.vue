<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de entregables
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Nombre del archivo"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <div align="center">
        <v-data-table :headers="headers" :items="item" :search="search">
          <template v-slot:[`item.entregables`]="{ item }">
            <v-btn rounded color="greenButton" dark @click="verEntregables(item)">
              <v-icon> mdi-eye </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-dialog v-model="dialog" width="800">
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
          Fases de: {{ seeDataRow.name }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchTable"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            color="red"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="encabezado"
          :items="seeDataRow.entregable"
          :search="searchTable"
          :items-per-page="5"
        >
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "DeliverableProjectTable",
  data() {
    return {
      search: "",
      headers: [
        { text: "Proyecto", align: "start", value: "name" },
        { text: "Ver entregables", value: "entregables" },
      ],
      encabezado: [{ text: "Entregable", aling: "center", value: "file" }],
      item: [
        {
          name: "SIDEC",
          value: "proyecto",
          entregable: [
            { file: "DFR" },
            { file: "Lista de interesados" },
            { file: "Firmas" },
          ],
        },
        {
          name: "Casas Norte",
          value: "proyecto",
          entregable: [
            { file: "DFR" },
            { file: "Lista de interesados" },
            { file: "Firmas" },
          ],
        },
        {
          name: "SAT",
          value: "proyecto",
          entregable: [
            { file: "DFR" },
            { file: "Lista de interesados" },
            { file: "Firmas" },
          ],
        },
        {
          name: "Administración Cuevas",
          value: "proyecto",
          entregable: [
            { file: "DFR" },
            { file: "Lista de interesados" },
            { file: "Firmas" },
          ],
        },
      ],
      dialog: false,
      seeDataRow: {},
      searchTable: "",
    };
  },
  methods: {
    verEntregables(item) {
      this.dialog = true;
      this.seeDataRow = item;
    },
  },
};
</script>