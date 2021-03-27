<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1150">
      <template v-slot:activator="{ on, attrs }">
        <v-btn rounded class="greenButton" dark v-bind="attrs" v-on="on" @click="recarga()">
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
          Proyectos de: {{ dataExtern.firstName }}
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
          :items="adscritoProyects"
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
            :items="puestos"
            item-text="name"
            v-model="Adscrito.labor.id"
            item-value="id"
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
            @click="dialog2 = false, editLabor()"
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
            @click="(dialog3 = false), deleteProject()"
          >
            Quitar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AttachedResource from "../../../services/projectManager/service/AttachedResourceService";
import LaborService from "../../../services/projectManager/service/LaborService";
import Notify from "../../../notifications/Notify";

export default {
  name: "SeeAttachedResource",
  props: {
    dataExtern: {},
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Proyecto", align: "start", value: "project.name" },
        { text: "Tipo de proyecto", align: "start", value: "project.type.name" },
        { text: "Puesto", align: "start", value: "labor.name" },
        { text: "Editar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
        Adscrito: {
        id: null,
        employe: {
          id: 0,
        },
        project: {
          id: 0,
        },
        labor: {
          id: 0,
        },
      },
      adscritoProyects: [],
      puestos: [],
      dialog: false,
      dialog2: false,
      dialog3: false,
      deleteDataRow: {},
      editDataRow: {},
    };
  },
  methods: {
    getAllProjectsAdscrito(){
      let id = this.dataExtern.id
      console.log(id)
      AttachedResource.getOneAdscritoProjects(id)
      .then(response =>{
        this.adscritoProyects = response.data
      })
      .catch(e =>{
        console.log(e)
      })
      

    },

    getAllLabors(){
      LaborService.getAll()
      .then(response =>{
        this.puestos = response.data

      })
      .catch(e =>{
        console.log(e)
      })

    },

    editLabor(){
      if(
        this.Adscrito.id === "" ||
        this.Adscrito.employe.id === "" ||
        this.Adscrito.project.id === "" ||
        this.Adscrito.labor.id === "" 
      ){
      }else{
        console.log(this.Adscrito)
        AttachedResource.update(this.Adscrito.id,this.Adscrito)
        .then(response =>{
          this.Adscrito.id = null,
          this.Adscrito.employe.id = 0,
          this.Adscrito.project.id = 0
           Notify.done("updateProject");
           this.getAllProjectsAdscrito()

        })
        .catch(e =>{
          console.log(e)
          Notify.error("saveData");

        })

      }
    },

    deleteProject(){
      let id = this.deleteDataRow.id
      AttachedResource.delete(id)
      .then(response =>{
       Notify.done("deleteProject");
       this.getAllProjectsAdscrito()
       this.dialog2 = false

      }).catch(e =>{
        console.log(e)
         Notify.error("deleteData");

      })

    },

    recarga(){
      this.getAllProjectsAdscrito()

    },

    editar(item) {
      this.getAllProjectsAdscrito()
      this.dialog2 = true;
      this.Adscrito = item;
      console.log(this.Adscrito)
    },

    eliminar(item) {
      this.dialog3 = true;
      this.deleteDataRow = item;
      console.log(this.deleteDataRow.id)
    },
  },

  mounted(){
    this.getAllProjectsAdscrito()
    this.getAllLabors()
  }
};
</script>