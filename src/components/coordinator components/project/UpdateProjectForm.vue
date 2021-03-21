<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Modificar proyecto
            <v-sheet color="black" height="3"></v-sheet>
          </h1>
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          class="mt-2"
          outlined
          dense
          color="red"
          placeholder="Nombre del proyecto"
          prepend-inner-icon="mdi-magnify"
          v-model="param"
        ></v-text-field>
      </v-col>
      <v-col class="mt-2" cols="12" sm="6" md="1">
        <v-btn color="red" rounded @click="searchByName()">
          <span class="white--text">Buscar</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-0">
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
          disabled
        ></v-select>

        <h6 class="subtitle-1 mb-2">Responsable:</h6>
        <v-select
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-clipboard-account"
          v-bind:items="employees"
          v-model="project.employe.id"
          item-text="firstName"
          item-value="id"
        ></v-select>

        <h6 class="subtitle-1 mb-2">Costo:</h6>
        <v-text-field
          type="number"
          outlined
          dense
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
          <v-btn color="grayButton" rounded class="mr-2" @click="returnTable()">
            <span class="black--text">Cancelar</span>
          </v-btn>
          <v-btn color="red" rounded class="ml-2" @click="valid()">
            <span class="mr-1 ml-1 white--text">Modificar proyecto</span>
          </v-btn>

          <v-dialog v-model="dialog" width="600" persistent>
            <v-card class="rounded-lg">
              <v-card-title class="red">
                <span class="headline" style="color: white">
                  <v-icon color="white">mdi-pencil</v-icon>¿Estás seguro que
                  quieres actualizar {{ this.project.name }}?
                </span>
              </v-card-title>
              <v-card-text class="mt-5">
                <span class="black--text">
                  Los cambios se aplicarán inmediatamente, verifique los datos
                  antes de actualizarlos.</span
                >
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
                  Regresar
                </v-btn>
                <v-btn
                  elevation="2"
                  color="green darken-1"
                  text
                  @click="(dialog = false), updateProject()"
                >
                  Actualizar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Notify from "../../../notifications/Notify";
import ControllerService from "../../../services/controller/ControllerService";
import EmployeService from "../../../services/humanResource/service/EmployeService";
import CoordinatorService from "../../../services/coordinator/CoordinatorService";
export default {
  name: "UpdateProjectForm",
  data() {
    return {
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
      param: "",
      dialog: false,
      projectTypes: [],
      employees: [],
    };
  },
  methods: {
    valid() {
      if (this.project.id === null) {
        Notify.fillFields("forceToSearch");
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    },
    updateProject() {
      //Actualizamos el proyecto (por ID)
      CoordinatorService.update(this.project.id, this.project)
        .then((response) => {
          //Regresa los inputs en blanco
          this.project.id = null;
          this.project.name = "";
          this.project.duration = "";
          this.project.description = "";
          this.project.clientName = "";
          this.project.date = "";
          this.project.cost = "";
          this.project.employe.id = 0;
          this.project.type.id = 0;
          Notify.done("updateProject");
          this.$router.push("/generalProject");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchByName() {
      //Buscamos el proyecto por nombre
      if (this.param === "") {
        Notify.fillFields("searchInput");
      } else {
        CoordinatorService.searchByName(this.param)
          .then((response) => {
            if (response.data.id === undefined) {
              //información
              Notify.info("projectNotFound");
            } else {
              this.project.id = response.data.id;
              this.project.name = response.data.name;
              this.project.duration = response.data.duration;
              this.project.description = response.data.description;
              this.project.clientName = response.data.clientName;
              this.project.date = response.data.date;
              this.project.cost = response.data.cost;
              this.project.employe.id = response.data.employe.id;
              this.project.type.id = response.data.type.id;
            }
          })
          .catch((e) => {
            console.log(e);
            Notify.error("updateData");
          });
      }
    },
    getAllEmployees() {
      //Obtenemos la lista de los empleados
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
      //Obtenemos la lista de los tipo de proyecto
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
    getOne(id) {
      CoordinatorService.getOne(id)
        .then((response) => {
          this.project = response.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },
    returnTable() {
      this.$router.push("/generalProject");
    },
  },
  mounted() {
    //cargamos datos al renderizar la vista
    this.getAllTypes();
    this.getAllEmployees();
    //Al cargar la vista validamos si es que no hay un id desde el router si no hay, no carga datos
    //Si hay un id en el router, mandamos a buscar ese ID (esto es para la tabla)
    if (this.$route.params.id === undefined) {
    } else {
      this.getOne(this.$route.params.id);
    }
  },
};
</script>