<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de proyectos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Nombre del proyecto"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <div align="center">
        <v-data-table :headers="headers" :items="item" :search="search">
          <template v-slot:[`item.progreso`]="{ item }">
            <v-btn
              rounded
              color="greenButton"
              width="25%"
              dark
              @click="verProgreso(item)"
            >
              <v-icon> mdi-eye </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
      <v-card rounded="lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-progress-clock</v-icon> Proyecto
            {{ this.seeDataRow.nombreProyecto }}
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <span class="black--text"
            >Progreso total: {{ this.seeDataRow.progresoTotal }}%</span
          >
          <v-progress-linear
            color="teal"
            height="10"
            buffer-value="100"
            class="mt-2"
            :value="this.seeDataRow.progresoTotal"
          ></v-progress-linear>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="gary" @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ProgressTable",
  data() {
    return {
      search: "",
      headers: [
        { text: "Nombre del proyecto", value: "nombreProyecto" },
        { text: "Nombre del responsable", value: "responsable" },
        { text: "Ver progreso", value: "progreso" },
      ],

      item: [
        {
          nombreProyecto: "USTORE",
          responsable: "Juan Perex",
          progresoTotal: 20,
        },
        {
          nombreProyecto: "SIDEC",
          responsable: "Paco Memo",
          progresoTotal: 100,
        },
      ],
      seeDataRow: {},
      dialog: false,
    };
  },
  methods: {
    verProgreso(item) {
      this.dialog = true;
      this.seeDataRow = item;
    },
  },
};
</script>