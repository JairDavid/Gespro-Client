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
          label="Buscar"
          single-line
          hide-details
          color="red"
        >
        </v-text-field
      ></v-card-title>
      <div>
        <v-data-table
          :headers="encabezado"
          :items="cosas"
          :search="search"
          :items-per-page="5"
          class="elevation-1 mt-16"
        >
          <template v-slot:[`item.down`]="{ item }">
            <v-btn rounded color="blueButton" @click="bajar(item)">
              <v-icon class="white--text">mdi-cloud-download</v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.up`]="{ item }">
            <v-btn rounded color="greenButton" @click="subir(item)">
              <v-icon class="white--text">mdi-cloud-upload</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-center">
          <!--Dialog de subir el avance-->
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="white lighten-2">
                <h6
                  class="font-weight-bold text-h6 text-decoration-underline mt-2"
                >
                  Subir avance
                </h6>
              </v-card-title>

              <v-card-text>
                <h6 class="subtitle-1 mb-2">Archivo:</h6>
                <v-file-input
                  outlined
                  dense
                  color="red"
                  prepend-icon=""
                  prepend-inner-icon="mdi-paperclip"
                ></v-file-input>
                <h6 class="subtitle-1 mb-2">Comentario:</h6>
                <v-textarea
                  outlined
                  color="red"
                  name="input-7-4"
                  prepend-icon=""
                  prepend-inner-icon="mdi-message-text"
                ></v-textarea>
                <v-row>
                  <v-col cols="12" sm="9" md="3"></v-col>
                  <v-col cols="12" sm="9" md="6">
                    <v-checkbox
                      v-model="selected"
                      color="red"
                      label="Marcar como terminado"
                      value="true"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grayButton"
                  class="black--text"
                  rounded
                  @click="dialog = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="red"
                  class="white--text"
                  rounded
                  @click="dialog = false"
                >
                  Añadir Entregable
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "UpDownTable",
  data() {
    return {
      selected: false,
      search: "",
      encabezado: [
        { text: "Lista de entregables", align: "start", value: "name" },
        { text: "Descargar archivo", align: "center", value: "down" },
        { text: "Subir avance", align: "center", value: "up" },
      ],
      cosas: [
        { name: "DFR" },
        { name: "Lista de interesados" },
        { name: "Casos de uso" },
        { name: "Diagramas UML" },
      ],
      dialog: false,
    };
  },
  methods: {
    subir(item) {
      this.dialog=true;
    },
    bajar(item) {

    },
  },
};
</script>