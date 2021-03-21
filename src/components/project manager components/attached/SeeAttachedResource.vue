<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1150">
      <template v-slot:activator="{ on, attrs }">
        <v-btn rounded class="greenButton" dark v-bind="attrs" v-on="on">
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
          Proyectos de: {{ dataExtern.nombre }}
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
          :headers="headers"
          :items="item"
          :search="search"
          :items-per-page="5"
        >
          <template v-slot:[`item.editar`]="{ item }">
            <v-btn rounded class="greenButton" @click="editar(item)">
              <v-icon class="white--text">mdi-pencil</v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.eliminar`]="{ item }">
            <v-btn rounded class="yellowButton" @click="eliminar(item)">
              <v-icon class="white--text">mdi-delete-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-pencil</v-icon> Modificar puesto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-select
            prepend-inner-icon="mdi-briefcase"
            :items="['Tester', 'Programador', 'Diseñador']"
            label="Puesto"
            outlined
            color="red"
          >
          </v-select>
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
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog2 = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-delete</v-icon> Eliminar puesto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h4 style="text-align: center" class="black--text">
              ¿Estás seguro que deseas removerlo del proyecto "{{
                deleteDataRow.proyecto
              }}"?
            </h4>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog3 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog3 = false"
          >
            Quitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "SeeAttachedResource",
  props: {
    dataExtern: {},
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Proyecto", align: "start", value: "proyecto" },
        { text: "Tipo de proyecto", align: "start", value: "tipo" },
        { text: "Puesto", align: "start", value: "puesto" },
        { text: "Editar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      item: [
        {
          proyecto: "SIDEC",
          tipo: "Software",
          puesto: "Programador",
        },
        {
          proyecto: "GACU",
          tipo: "Diseño",
          puesto: "Diseñador",
        },
        {
          proyecto: "PROA",
          tipo: "Arquitectura",
          puesto: "Master",
        },
        {
          proyecto: "SIDEC",
          tipo: "Software",
          puesto: "Programador",
        },
      ],
      dialog: false,
      dialog2: false,
      dialog3: false,
      deleteDataRow: {},
      editDataRow: {},
    };
  },
  methods: {
    editar(item) {
      this.dialog2 = true;
      this.editDataRow = item;
    },
    eliminar(item) {
      this.dialog3 = true;
      this.deleteDataRow = item;
    },
  },
};
</script>