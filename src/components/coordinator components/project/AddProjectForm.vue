<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Añadir proyecto
            <v-sheet color="black" height="3"></v-sheet>
          </h1>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" sm="6" md="6">
        <h6 class="subtitle-1 mb-2">Nombre del proyecto:</h6>
        <v-text-field
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-notification-clear-all"
          v-model="project.name"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Duración estimada del proyecto (Días):</h6>
        <v-text-field
          type="number"
          outlined
          dense
          :rules="[rules.durationMin]"
          color="red"
          prepend-inner-icon="mdi-clock"
          v-model="project.duration"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Descripción breve del proyecto:</h6>
        <v-textarea
          no-resize
          outlined
          dense
          color="red"
          hint="(Opcional)"
          persistent-hint
          prepend-inner-icon="mdi-view-day"
          v-model="project.description"
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <h6 class="subtitle-1 mb-2">Cliente:</h6>
        <v-text-field
          outlined
          dense
          color="#A93226"
          prepend-inner-icon="mdi-notification-clear-all"
          v-model="project.clientName"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Tipo de proyecto:</h6>
        <v-select
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-folder"
          v-bind:items="projectTypes"
          v-model="project.type.id"
          item-text="name"
          item-value="id"
        ></v-select>

        <h6 class="subtitle-1 mb-2">Responsable:</h6>
        <v-select
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-clipboard-account"
          v-bind:items="employees"
          v-model="project.employe.id"
          item-text="fullName"
          item-value="id"
        ></v-select>

        <h6 class="subtitle-1 mb-2">Costo:</h6>
        <v-text-field
          type="number"
          outlined
          dense
          :rules="[rules.costMin]"
          color="red"
          prepend-inner-icon="mdi-currency-usd"
          v-model="project.cost"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Fecha de entrega:</h6>
        <v-text-field
          type="date"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-calendar-range"
          v-model="project.date"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-row class="pb-4" align="center" justify="center">
          <v-btn color="red" rounded class="ml-2" @click="saveProject()">
            <span class="mr-1 ml-1 white--text">Añadir proyecto</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Notify from "../../../notifications/Notify";
import ControllerService from "../../../services/controller/service/ControllerService";
import EmployeService from "../../../services/humanResource/service/EmployeService";
import CoordinatorService from "../../../services/coordinator/CoordinatorService";
export default {
  name: "AddProjectForm",
  data() {
    return {
      //Objeto que se envia a la API
      project: {
        id: null,
        name: "",
        duration: "",
        description: "",
        clientName: "",
        date: "",
        cost: "",
        employe: { id: 0 },
        type: { id: 0 },
      },
      //reglas para el costo y duración
      rules: {
        durationMin: (value) => {
          if (value < 1) {
            this.project.duration = 1;
            return false;
          } else {
            return true;
          }
        },
        costMin: (value) => {
          if (value < 1) {
            this.project.cost = 1;
            return false;
          } else {
            return true;
          }
        },
      },
      //Arreglos que se llenan con la API
      projectTypes: [],
      employees: [],
    };
  },
  methods: {
    saveProject() {
      //Validación de campos vacios
      if (
        this.project.id === "" ||
        this.project.name === "" ||
        this.project.duration === "" ||
        this.project.clientName === "" ||
        this.project.date === "" ||
        this.project.cost === "" ||
        this.project.employe.id === "" ||
        this.project.type.id === ""
      ) {
        //Advertencia
        Notify.fillFields("form");
      } else {
        CoordinatorService.searchByName(this.project.name)
          .then((response) => {
            if (response.data.name === undefined) {
              //Petición para guardar el proyecto
              CoordinatorService.save(this.project)
                .then((response) => {
                  this.project.id = null;
                  this.project.name = "";
                  this.project.duration = "";
                  this.project.description = "";
                  this.project.clientName = "";
                  this.project.date = "";
                  this.project.cost = "";
                  this.project.employe.id = 0;
                  this.project.type.id = 0;
                  //Toast de hecho
                  Notify.done("project");
                })
                .catch((e) => {
                  //Toast de error al guardar
                  Notify.error("saveData");
                  console.log(e);
                });
            } else {
              Notify.fillFields("valid-project");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getAllEmployees() {
      EmployeService.listAll()
        .then((response) => {
          this.employees = response.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },
    getAllTypes() {
      ControllerService.listAll()
        .then((response) => {
          this.projectTypes = response.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },
  },
  mounted() {
    //Al cargar la vista mandamos a llenar los desplegables
    this.getAllTypes();
    this.getAllEmployees();
  },
};
</script>
