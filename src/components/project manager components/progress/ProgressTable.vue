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
        <v-data-table :headers="headers" :items="proyects" :search="search">
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
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card rounded="lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-progress-clock</v-icon> Proyecto
            {{ this.seeDataRow.name }}
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <span class="black--text"
            >Progreso total: {{ this.suma }}%</span
          >
          <v-progress-linear
            color="teal"
            height="10"
            buffer-value="100"
            class="mt-2"
            :value="this.suma"
          ></v-progress-linear>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="gary"  @click="dialog = false , limpiar()"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProjectService from "../../../services/projectManager/service/ProjectService";
import ProgressService from "../../../services/projectManager/service/ProgressService";

export default {
  name: "ProgressTable",
  data() {
    return {
      search: "",
      headers: [
        { text: "Nombre del proyecto", value: "name" },
        { text: "Nombre del responsable", value: "employe.firstName" },
        { text: "Ver progreso", value: "progreso" },
      ],
      suma: 0,
      proyects: [],
      progreso: [],
      seeDataRow: {},
      dialog: false,
    };
  },
  methods: {
    limpiar(){
      this.suma = 0
    },

    progressSuma(){
        this.progreso.map(item =>{
        this.suma += item.deliverableAssigment.percent

      })
      console.log(this.suma)


    },

    getAllProgress(id){
      ProgressService.searchIdProject(id)
      .then(response =>{
        this.progreso = response.data
        this.progressSuma()
      }).catch(e =>{
        console.log(e)
      })

    
    },

    //Obtiene todos los proyectos
    getAllProyects(){
      ProjectService.getAll()
      .then(response =>{
        this.proyects = response.data
      })
      .catch(e =>{
        console.log(e)
      })

    },

    verProgreso(item) {
      let id = 0
      this.dialog = true;
      this.seeDataRow = item;
      id = this.seeDataRow.id
      this.getAllProgress(id)
      console.log(id)
    },
  },

  mounted(){
    this.getAllProyects()
  }
};
</script>