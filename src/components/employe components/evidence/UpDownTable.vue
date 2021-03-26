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
          :items="deliverables"
          :search="search"
          :items-per-page="5"
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
            <v-card class="rounded-lg">
              <v-card-title class="red">
                <span class="headline" style="color: white">
                  <v-icon color="white">mdi-cloud-upload</v-icon> Subir avance
                </span>
              </v-card-title>
              <v-card-text class="mt-5">
                <v-file-input
                  outlined
                  label="Archivo"
                  dense
                  color="red"
                  prepend-icon=""
                  prepend-inner-icon="mdi-paperclip"
                ></v-file-input>

                <v-textarea
                  outlined
                  label="Comentario"
                  color="red"
                  name="input-7-4"
                  prepend-icon=""
                  prepend-inner-icon="mdi-message-text"
                  no-resize
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
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import EmployeService from "../../../services/employe/service/ProgressService";
import Notify from "../../../notifications/Notify";
import AttachedResourceService from "../../../services/projectManager/service/AttachedResourceService";
import ProjectPhaseService from "../../../services/employe/service/ProjectPhaseService";
import DeliverableAssigmentService from "../../../services/employe/service/DeliverableAssigmentService";

export default {
  name: "UpDownTable",
  data() {
    return {
      selected: false,
      search: "",
      encabezado: [
        {
          text: "Lista de entregables",
          align: "start",
          value: "deliverable.name",
        },
        { text: "Descargar archivo", align: "center", value: "down" },
        { text: "Subir avance", align: "center", value: "up" },
      ],
      deliverables: [],
      phases: [],
      dialog: false,
    };
  },
  methods: {
    subir(item) {
      this.dialog = true;
    },
    getPhases(id) {
      ProjectPhaseService.searchIdProject(id)
        .then((response) => {
          this.phases = response.data;
          this.phases.map((item, i) => {
            let idFase = item.id;
            DeliverableAssigmentService.searchDeliverable(idFase)
              .then((response) => {
                this.deliverables[i] = response.data;
              })
              .catch((e) => {
                console.log(e);
                Notify.error("getData");
              });
          });
        })
        .catch((e) => {
          console.log(e);
          Notify.error("getData");
        });
    },
    bajar(item) {},
    getAllDeliverables() {},
  },
  mounted() {
    if (this.$route.params.id === undefined) {
    } else {
      this.getPhases(this.$route.params.id);
    }
  },
};
</script>