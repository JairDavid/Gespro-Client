<template>
  <div>
    <v-row align="center" class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row pt-2">
          <h1 class="font-weight-black text-h4 mt-2">
            Tipo de proyecto vacío
            <v-sheet color="black" height="3"></v-sheet>
          </h1>
        </div>
        <h3>Asignación de fases y entregables</h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="12" md="12">
        <h2>Porcentaje total: {{ this.acum }}%</h2>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-select
        class="mb-2"
        outlined
        dense
        color="red"
        label="Tipo vacío"
        v-bind:items="types"
        v-model="type.id"
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-clipboard-text"
      ></v-select>
      <v-btn
        rounded
        color="blueButton"
        dark
        class="mx-3 mb-2"
        @click="open()"
        width="240"
      >
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Agregar contenido
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" rounded class="mx-2 mb-2" @click="showConfirm()">
        <span class="white--text">Finalizar</span>
      </v-btn>
      <v-btn color="gray" rounded class="mx-2 mb-2" @click="cancel()">
        <span class="black--text">Cancelar</span>
      </v-btn>
    </v-row>
    <v-row class="mt-5">
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(fases, i) in allData" :key="i">
          <v-expansion-panel-header color="light-blue darken-3">
            <span class="white--text subtitle-1"
              ><v-avatar class="mr-2" color="teal lighten-1" size="37">
                {{ fases.percent }}%</v-avatar
              >
              Fase: {{ fases.fase.name }}</span
            >
            <template v-slot:actions>
              <v-icon
                class="mx-5"
                color="white"
                @click.native.stop="deletePhase(i, fases)"
              >
                mdi-minus</v-icon
              >
              <v-icon color="white"> $expand </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="fases.entregables"
              :hide-default-footer="true"
              class="elevation-1 mt-5"
            ></v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-dialog v-model="dialog2" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon left class="white--text">mdi-information</v-icon> ¿Estás
            seguro de guardar los datos actuales?
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <h3 style="text-align: center">
            Una vez asignados no podrán moverse del lugar elegido.
          </h3>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog2 = false"
          >
            Cancelar
          </v-btn>
          <v-btn elevation="2" color="green darken-1" text @click="saveAll()">
            Sí, Finalizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" persistent max-width="700">
      <v-card class="rounded-lg">
        <v-stepper v-model="e1">
          <v-stepper-header class="red">
            <v-stepper-step :complete="e1 > 1" step="1" color="blue">
              <span style="color: white">Seleccionar fase</span>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2" color="blue">
              <span style="color: white">Seleccionar entregables</span>
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card height="100" elevation="0" color="grey lighten-5">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="8">
                        <v-select
                          outlined
                          dense
                          color="red"
                          item-color="red"
                          label="Nombre de la fase"
                          v-bind:items="phases"
                          v-model="content.phase"
                          item-text="name"
                          item-value="id"
                          return-object
                          prepend-inner-icon="mdi-format-list-bulleted-square"
                        ></v-select
                      ></v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="number"
                          outlined
                          dense
                          color="red"
                          label="Porcentaje"
                          v-model="content.percent"
                          prepend-inner-icon="mdi-percent"
                          :rules="[rules.loanMin, rules.loanMax]"
                        >
                        </v-text-field
                      ></v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  color="blue-grey darken-1"
                  text
                  @click="dialog1 = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  elevation="2"
                  color="green darken-1"
                  text
                  @click="e1 = 2"
                >
                  Continuar
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card height="100" elevation="0" color="grey lighten-5">
                <span class="subtitle-1 black--text">Entregables:</span>
                <v-select
                  v-model="listDeliverable"
                  :items="deliverables"
                  multiple
                  hint="Selecciona tus entregables"
                  persistent-hint
                  outlined
                  dense
                  item-color="red"
                  chips
                  color="red"
                  item-text="name"
                  item-value="id"
                  return-object
                ></v-select>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  color="blue-grey darken-1"
                  text
                  @click="dialog1 = false"
                >
                  Cancelar
                </v-btn>

                <v-btn
                  elevation="2"
                  color="blue-grey darken-1"
                  text
                  @click="e1 = 1"
                >
                  Regresar
                </v-btn>
                <v-btn
                  elevation="2"
                  color="green darken-1"
                  text
                  @click="submit()"
                >
                  Guardar datos
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DeliverableAssigmentService from "../../../services/controller/service/DeliverableAssigmentService";
import DeliverableService from "../../../services/controller/service/DeliverableService";
import PhaseService from "../../../services/controller/service/PhaseService";
import ControllerService from "../../../services/controller/service/ControllerService";
import TypePhaseService from "../../../services/controller/service/TypePhaseService";
import Notify from "../../../notifications/Notify";
export default {
  name: "FillNewType",
  data() {
    return {
      headers: [
        {
          text: "Entregable",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Archivo designado",
          sortable: false,
          align: "start",
          value: "originalName",
        },
      ],
      //reglas del input de tipo númerico para que no pase del rango del 1-100
      rules: {
        loanMin: (value) => {
          if (value < 0) {
            this.content.percent = 0;
          }
        },
        loanMax: (value) => {
          if (value > 100) {
            this.content.percent = 100;
          }
        },
      },
      type: {
        id: null,
      },
      content: {
        phase: {},
        percent: 0,
        deliverable: [],
      },
      //Fases de la API
      phases: [],
      //Tipos de la API vacíos
      types: [],
      //Entregables de la API
      deliverables: [],
      allData: [],
      //contener la data de los entregables que yo generé N por fase
      listDeliverable: [],
      dialog1: false,
      dialog2: false,
      acum: 0,
      bool: false,
      e1: 1,
    };
  },
  methods: {
    deletePhase(index, extern) {
      this.allData.splice(index, 1);
      this.acum = parseInt(this.acum) - parseInt(extern.percent);
    },
    open() {
      if (this.acum >= 100) {
        Notify.info("outOfRange");
      } else {
        this.dialog1 = true;
        this.content.phase = {};
        this.content.percent = 0;
        this.content.deliverable = [];
        this.listDeliverable = [];
        this.e1 = 1;
      }
    },
    showConfirm() {
      if (this.type.id === null || this.allData.length == 0) {
        Notify.fillFields("fillContent");
        this.dialog2 = false;
      } else if (this.acum < 100) {
        Notify.info("incomplete");
        this.dialog2 = false;
      } else {
        this.dialog2 = true;
      }
    },
    //validaciones extremas :v no mover pls
    submit() {
      this.content.deliverable = this.listDeliverable;
      let contenido = {
        fase: this.content.phase,
        percent: this.content.percent,
        entregables: this.content.deliverable,
      };
      if (
        this.content.deliverable.length == 0 ||
        Object.entries(contenido.fase).length === 0
      ) {
        Notify.fillFields("stepperFields");
      } else if (contenido.percent < 1 || contenido.percent > 100) {
        Notify.fillFields("percentContent");
      } else if (this.allData.length == 0) {
        this.acum = parseInt(this.acum) + parseInt(contenido.percent);
        this.allData.push(contenido);
        this.dialog1 = false;
      } else {
        this.searchID(contenido);
        if (this.bool === true) {
          Notify.fillFields("samePhase");
        } else {
          if (this.acum + parseInt(contenido.percent) > 100) {
            Notify.info("outPercent");
          } else {
            this.allData.push(contenido);
            this.acum = parseInt(this.acum) + parseInt(contenido.percent);
            this.dialog1 = false;
          }
        }
      }
      console.log(this.acum);
    },
    //
    cancel() {
      const path = `/type`;
      if (this.$route.path !== path) this.$router.replace(path);
    },
    searchID(extern) {
      this.bool = false;
      for (var i = 0; i < this.allData.length; i++) {
        if (this.allData[i].fase.id === extern.fase.id) {
          this.bool = true;
          break;
        }
      }
    },
    saveAll() {
      this.allData.map((item, i) => {
        let fase_tipo = {
          id: null,
          type: {
            id: this.type.id,
          },
          phase: {
            id: item.fase.id,
          },
          percent: item.percent,
        };
        TypePhaseService.save(fase_tipo)
          .then((response) => {
            console.log(response.data);
            alert(response.data);
            let idfasetipo = response.data.id;
            let porcentajeIndividual =
              response.data.percent / item.entregables.length;
            item.entregables.map((e, j) => {
              let deliverableAssigment = {
                id: null,
                typePhase: {
                  id: idfasetipo,
                },
                deliverable: {
                  id: e.id,
                },
                percent: porcentajeIndividual,
              };
              DeliverableAssigmentService.save(deliverableAssigment)
                .then((response) => {
                  this.dialog2 = false;
                  this.cancel();
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    getNotAssigned() {
      ControllerService.listNotAssigned()
        .then((response) => {
          this.types = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPhases() {
      PhaseService.listAll()
        .then((response) => {
          this.phases = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDeliverable() {
      DeliverableService.listAll()
        .then((response) => {
          this.deliverables = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPhases();
    this.getDeliverable();
    this.getNotAssigned();
  },
};
</script>