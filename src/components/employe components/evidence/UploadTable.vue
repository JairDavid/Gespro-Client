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
        :items="projects"
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

import EmployeService from "../../../services/employe/service/ProgressService";
import Notify from "../../../notifications/Notify";
import AttachedResourceService from "../../../services/employe/service/AttachedResourceService";



export default {
  name: "UploadTable",
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre de proyecto", align: "start", value: "project.name" },
        { text: "Lider del proyecto", align: "start", value: "project.employe.fullName" },
        { text: "Ver entregables", align: "center", value: "button" },
      ],
      projects: [
        
      ],
    };
  },

  methods: {
    consultaGeneral(item) {
      
      this.$router.push("/btnUploadDeliverable/"+item.project.type.id+"/"+item.project.id);
    },
    getAllProjects(){
      //el id es estático hasta tener el dato del inicio de sesión
      let idEmp = localStorage.getItem("sysin");
      AttachedResourceService.getByIdEmp(idEmp)
      .then((response )=>{
        this.projects=response.data;
      })
      .catch((e)=>{
        console.log(e);
        Notify.error("getData");
      });
    },
  },
  mounted(){
    this.getAllProjects();
  },
};
</script>