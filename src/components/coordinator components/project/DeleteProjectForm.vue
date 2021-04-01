<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Eliminar proyecto
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
          disabled
          outlined
          dense
          color="#A93226"
          prepend-inner-icon="mdi-notification-clear-all"
          v-model="project.name"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Duración estimada del proyecto (Días):</h6>
        <v-text-field
          type="number"
          disabled
          outlined
          dense
          color="#A93226"
          prepend-inner-icon="mdi-clock"
          v-model="project.duration"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Descripción breve del proyecto:</h6>
        <v-textarea
          disabled
          no-resize
          outlined
          dense
          color="#A93226"
          prepend-inner-icon="mdi-view-day"
          v-model="project.description"
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <h6 class="subtitle-1 mb-2">Cliente:</h6>
        <v-text-field
          outlined
          disabled
          dense
          color="#A93226"
          prepend-inner-icon="mdi-notification-clear-all"
          v-model="project.clientName"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Tipo de proyecto:</h6>
        <v-select
          outlined
          disabled
          dense
          color="#A93226"
          prepend-inner-icon="mdi-folder"
          :label="project.type.name"
        >
        </v-select>

        <h6 class="subtitle-1 mb-2">Responsable:</h6>
        <v-select
          outlined
          disabled
          dense
          color="#A93226"
          prepend-inner-icon="mdi-folder"
          :label="project.employe.fullName"
        >
        </v-select>

        <h6 class="subtitle-1 mb-2">Costo:</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="#A93226"
          prepend-inner-icon="mdi-currency-usd"
          v-model="project.cost"
        ></v-text-field>

        <h6 class="subtitle-1 mb-2">Fecha de entrega:</h6>
        <v-text-field
          type="date"
          disabled
          outlined
          dense
          color="#A93226"
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
          <v-btn color="red" rounded class="ml-2" dark @click="valid()">
            <span class="mr-1 ml-1 white--text">Eliminar proyecto</span>
          </v-btn>

          <v-dialog v-model="dialog" width="600" persistent>
            <v-card class="rounded-lg">
              <v-card-title class="red">
                <span class="headline" style="color: white">
                  <v-icon color="white">mdi-delete</v-icon>¿Estás seguro que
                  quieres eliminar {{ this.project.name }}?
                </span>
              </v-card-title>
              <v-card-text class="mt-5">
                <span class="black--text">
                  Esto será de forma permanente, verifica los datos antes de
                  eliminar.</span
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
                  @click="(dialog = false), deleteProject()"
                >
                  Eliminar
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
import CoordinatorService from "../../../services/coordinator/CoordinatorService";
export default {
  name: "DeleteProjectForm",
  data() {
    return {
      //Objeto que se envia a la API
      project: {
        id: "",
        name: "",
        duration: "",
        description: "",
        clientName: "",
        date: "",
        cost: "",
        employe: { name: "" },
        type: { name: "" },
      },
      //variable del input que hace la busqueda
      param: "",
      //Modal de confirmación
      dialog: false,
    };
  },
  methods: {
    valid() {
      //Validación si hay un proyecto cargado a eliminar, si no hay mandamos una advertencia para buscar uno
      if (this.project.id === "") {
        //Advertencia
        Notify.fillFields("forceToSearch");
        this.dialog = false;
      } else {
        //si hay un proyecto cargado, se le permite mostrar el modal
        this.dialog = true;
      }
    },
    deleteProject() {
      //Petición para eliminar el proyecto
      CoordinatorService.delete(this.project.id)
        .then((response) => {
          //Toast de hecho
          Notify.done("deleteProject");
          //Redireccionamos a la tabla
          this.$router.push("/generalProject");
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al eliminar
          Notify.error("deleteData");
        });
    },
    searchByName() {
      //Validación del input de búsqueda si es que está vacio
      if (this.param === "") {
        //Advertencia
        Notify.fillFields("searchInput");
      } else {
        CoordinatorService.searchByName(this.param)
          .then((response) => {
            //Validación si es que no se encontró el nombre del proyecto
            if (response.data.name === undefined) {
              //información
              Notify.info("projectNotFound");
            } else {
              this.project = response.data;
            }
          })
          .catch((e) => {
            console.log(e);
            //Toast de error al obtener la info del proyecto
            Notify.error("getData");
          });
      }
    },
    getOne(id) {
      //Peticion para obtener el proyecto por ID
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
      //Redireccionamos a la tabla
      this.$router.push("/generalProject");
    },
  },
  mounted() {
    //Al cargar la vista validamos si es que no hay un id desde el router si no hay, no carga datos
    //Si hay un id en el router, mandamos a buscar ese ID (esto es para la tabla)
    if (this.$route.params.id === undefined) {
    } else {
      this.getOne(this.$route.params.id);
    }
  },
};
</script>
