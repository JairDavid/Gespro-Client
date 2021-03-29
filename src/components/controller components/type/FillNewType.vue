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
    </v-row>
    <v-row class="mt-6">
      <v-select
        outlined
        dense
        color="red"
        label="Tipo de proyecto"
        v-bind:items="types"
        item-text="name"
        item-value="name"
        prepend-inner-icon="mdi-clipboard-text"
      ></v-select>
      <v-btn rounded color="blueButton" dark class="mx-3" @click="open()">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Agregar contenido
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" rounded class="mx-2">
        <span class="white--text">Finalizar</span>
      </v-btn>
      <v-btn color="gray" rounded class="mx-3">
        <span class="black--text">Cancelar</span>
      </v-btn>
    </v-row>
    <v-row class="mt-5">
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="(fases, i) in allData.dataDeliverable"
          :key="i"
        >
          <v-expansion-panel-header color="#0086DD">
            <span class="white--text">Fase {{ i }}</span>
            <template v-slot:actions>
              <v-icon
                class="mx-5"
                color="white"
                @click.native.stop="deletePhase(i)"
              >
                mdi-minus</v-icon
              >
              <v-icon color="white"> $expand </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <span v-for="(obj, index) in allData.xd" :key="index">
              {{ obj.name }}
            </span>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>

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
                          item-text="name"
                          item-value="name"
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
                          prepend-inner-icon="mdi-percent"
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
                  color="green darken-1"
                  text
                  @click="e1 = 2"
                >
                  Continuar
                </v-btn>
                <v-btn
                  elevation="2"
                  color="blue-grey darken-1"
                  text
                  @click="dialog1 = false"
                >
                  Cancelar
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
                  item-text="obj.name"
                  item-value="obj"
                ></v-select>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  color="green darken-1"
                  text
                  @click="submit()"
                >
                  Guardar datos
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
                  color="blue-grey darken-1"
                  text
                  @click="dialog1 = false"
                >
                  Cancelar
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
export default {
  name: "FillNewType",
  data() {
    return {
      phases: [{ name: "F1" }, { name: "F2" }, { name: "F3" }],
      types: [{ name: "T1" }, { name: "T2" }, { name: "T3" }],
      deliverables: [
        {
          obj: {
            name: "E1",
            id: "1",
          },
        },
        {
          obj: {
            name: "E2",
            id: "2",
          },
        },
        {
          obj: {
            name: "E3",
            id: "3",
          },
        },
      ],
      allData: {
        dataDeliverable: [],
        xd:[{name: "E1"},{name: "2",}],
      },
      //contener la data de los entregables que yo generé N
      listDeliverable: [],
      dialog1: false,
      e1: 1,
    };
  },
  methods: {
    deletePhase(index) {
      this.allData.dataDeliverable.splice(index, 1);
    },
    open() {
      this.dialog1 = true;
    },
    submit() {
      console.log(this.listDeliverable);
    },
  },
  mounted() {},
};
</script>

<style>
</style>