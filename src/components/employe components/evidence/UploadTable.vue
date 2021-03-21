<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Mis proyectos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          color="red"
        >
        </v-text-field
      ></v-card-title>
      <v-data-table
        :headers="encabezado"
        :items="cosas"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:[`item.button`]="{ item }">
          <v-btn rounded color="greenButton" @click="consultaGeneral(item)">
            <v-icon class="white--text">mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "UploadTable",
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de proyecto", align: "start", value: "name" },
        { text: "Lider del proyecto", align: "start", value: "lider" },
        { text: "Ver entregables", align: "center", value: "button" },
      ],
      cosas: [
        { name: "SIDEC", lider: "José Manuel" },
        { name: "CODEC", lider: "Marco peréz" },
      ],
    };
  },
  methods: {
    consultaGeneral(item) {
      this.$router.push("/UpDown");
    },
  },
};
</script>