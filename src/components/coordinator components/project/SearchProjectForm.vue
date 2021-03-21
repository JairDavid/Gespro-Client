<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Buscar proyecto
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
          color="#A93226"
          placeholder="Nombre del proyecto"
          prepend-inner-icon="mdi-magnify"
          v-model="param"
        ></v-text-field>
      </v-col>
      <v-col class="mt-2" cols="12" sm="6" md="1">
        <v-btn color="#A93226" rounded @click="searchByName()">
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
          :label="project.employe.firstName"
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
  </v-container>
</template>
<script>
import Notify from "../../../notifications/Notify";
import CoordinatorService from "../../../services/coordinator/CoordinatorService";
export default {
  name: "SearchProjectForm",
  data() {
    return {
      //Objeto que se manda a las vistas
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
      param: "",
    };
  },
  methods: {
    searchByName() {
      //Validación de campos de búsqueda
      if (this.param === "") {
        Notify.fillFields("searchInput");
      } else {
        //Petición para buscar por el nombre del proyecto
        CoordinatorService.searchByName(this.param)
          .then((response) => {
            if (response.data.name === undefined) {
              //información
              Notify.info("projectNotFound");
            } else {
              this.project = response.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getOne(id) {
      //Petición para buscar por el ID del proyecto
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