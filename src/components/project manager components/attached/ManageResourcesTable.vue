<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de empleados
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
      <v-data-table :headers="headers" :items="empleados" :search="search">
        <template v-slot:[`item.anadir`]="{ item }">
          <v-btn
            rounded
            color="blueButton"
            width="40%"
            dark
            @click="anadir(item)"
          >
            <v-icon> mdi-plus-circle </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.ver`]="{ item }">
          <SeeAttachedResource :dataExtern="item" />
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-plus-circle</v-icon> Añadir a un proyecto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <v-select
              color="red"
              prepend-inner-icon="mdi-briefcase"
              v-bind:items="proyectos"
              v-model="Adscrito.project.id"
              item-text="name"
              item-value="id"
              label="Proyecto"
              outlined
            >
            </v-select>
            <v-select
              color="red"
              prepend-inner-icon="mdi-briefcase"
              v-bind:items="puestos"
              item-text="name"
              v-model="Adscrito.labor.id"
              item-value="id"
              label="Puesto"
              outlined
            >
            </v-select>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="(dialog = false), limpiar()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog = false), validar()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SeeAttachedResource from "../attached/SeeAttachedResource";
import EmplooyesService from "../../../services/projectManager/service/EmplooyesService";
import ProjectService from "../../../services/projectManager/service/ProjectService";
import LaborService from "../../../services/projectManager/service/LaborService";
import AttachedResourceService from "../../../services/projectManager/service/AttachedResourceService";
import Notify from "../../../notifications/Notify";

export default {
  name: "ManageResourcesTable",
  components: {
    SeeAttachedResource,
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Curp", align: "start", value: "curp" },
        { text: "Nombre", align: "center", value: "fullName" },
        { text: "Direccion", align: "center", value: "adress" },
        { text: "Añadir", align: "center", value: "anadir" },
        { text: "Ver proyectos asignados", align: "center", value: "ver" },
      ],
      empleados: [],
      proyectos: [],
      puestos: [],
      idProjects: [],
      adscritoProyects: [],

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

      dialog: false,
      addDataRow: {},
      auxArray: [],
    };
  },
  methods: {
    // Deja limpio las listas desplegables
    limpiar() {
      (this.Adscrito.project.id = 0), (this.Adscrito.labor.id = 0);
    },
    // Obtener todos los proyectos en donde el empleado este registrado
    getAllProjectsAdscrito(id) {
      AttachedResourceService.getOneAdscritoProjects(id)
        .then((response) => {
          this.adscritoProyects = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Obtener todos los empleados
    getAllEmplooyes() {
      EmplooyesService.getAll()
        .then((response) => {
          this.auxArray = response.data;
          this.auxArray.map((emp, i) => {
            if (parseInt(emp.role.id) === 5) {
              this.empleados.push(emp);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Obtener todos los proyectos
    getAllProjects() {
      ProjectService.getAll()
        .then((response) => {
          this.proyectos = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Obtener todos los puestos
    getAllLabors() {
      LaborService.getAll()
        .then((response) => {
          this.puestos = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    ConsultarProyectos() {
      this.$router.push("/consultarProyectos");
    },
    anadir(item) {
      this.dialog = true;
      this.addDataRow = item;
      this.getAllProjectsAdscrito(item.id);
    },
    // valido si ya se encuentra el empleado registrado en el proyecto y que todos los campos esten llenos
    validar() {
      let add = false;
      let flag = false;

      if (this.Adscrito.project.id < 1 || this.Adscrito.labor.id < 1) {
        Notify.fillFields("adscrito");
        (this.Adscrito.project.id = 0), (this.Adscrito.labor.id = 0);
      } else {
        this.adscritoProyects.map((item, i) => {
          this.idProjects[i] = item.project.id;
        });

        for (let j = 0; j < this.idProjects.length; j++) {
          if (this.Adscrito.project.id === this.idProjects[j]) {
            Notify.fillFields("anotherAdd");
            (this.Adscrito.project.id = 0), (this.Adscrito.labor.id = 0);
            flag = true;
          }
        }

        if (flag === true) {
          add = false;
          this.idProjects = [];
        } else {
          add = true;
          this.idProjects = [];
        }

        if (add === true) {
          this.addAdscrito();
          this.idProjects = [];
        }
      }
    },

    // Añadir adscrito
    addAdscrito() {
      this.Adscrito.employe.id = this.addDataRow.id;
      AttachedResourceService.save(this.Adscrito)
        .then((response) => {
          (this.Adscrito.id = null),
            (this.Adscrito.employe.id = 0),
            (this.Adscrito.project.id = 0),
            (this.Adscrito.labor.id = 0);
          Notify.done("project");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.getAllEmplooyes();
    this.getAllProjects();
    this.getAllLabors();
  },
};
</script>
