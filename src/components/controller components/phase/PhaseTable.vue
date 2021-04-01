<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <!-- se manda el método getAllPhases a la vita de añadir-->
      <AddPhase @charge="getAllPhases" />
    </div>
    <v-card>
      <v-card-title>
        Lista de fases
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
        :headers="encabezado"
        :items="item"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:[`item.editar`]="{ item }">
          <v-btn rounded class="greenButton" @click="editar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.type`]="{ item }">
          <v-btn rounded class="blueButton" @click="mostrarTipo(item)">
            <v-icon class="white--text">mdi-eye</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.eliminar`]="{ item }">
          <v-btn rounded class="yellowButton" @click="eliminar(item)">
            <v-icon class="white--text">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog3" persistent max-width="600">
      <v-card>
        <v-card>
          <v-card-title>
            <v-btn
              color="greenButton"
              class="white--text"
              style="margin-right: 1%"
              rounded
              @click="dialog3 = false"
            >
              <v-icon class="white--text">mdi-arrow-left-thick</v-icon>
            </v-btn>
            Tipos con fase: {{ showDataRow.name }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchType"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
              color="red"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="encabezadoTipo"
            :items="types"
            :search="searchType"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-pencil</v-icon> Modificar fase
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-text-field
            color="red"
            v-model="editDataRow.name"
            outlined
            label="Nombre de la fase"
            prepend-inner-icon="mdi-ballot"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog1 = false, getAllPhases()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="updatePhase()"
          >
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-delete</v-icon> Eliminar fase
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h3 style="text-align: center">
              ¿Estas seguro que deseas eliminar "{{ deleteDataRow.name }}"?
            </h3>
          </v-container>
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
            @click="deletePhase()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddPhase from "../phase/AddPhase";
import PhaseService from "../../../services/controller/service/PhaseService";
import Notify from "../../../notifications/Notify";
import TypePhaseService from "../../../services/controller/service/TypePhaseService";
export default {
  name: "PhaseTable",
  components: {
    AddPhase,
  },
  data() {
    return {
      search: "",
      searchType: "",
      encabezado: [
        { text: "Nombre de las fases", align: "start", value: "name" },
        { text: "Tipo", align: "center", value: "type" },
        { text: "Modificar", align: "center", value: "editar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      //header de la subtable de ver tipos asiganados
      encabezadoTipo: [
        {
          text: "Nombre del tipo de proyecto",
          align: "start",
          value: "type.name",
        },
      ],
      //Lista de objetos que vienen de la API
      item: [],
      types: [],
      //vincula el item del row para accederlo
      editDataRow: {},
      showDataRow: {},
      deleteDataRow: {},

      dialog1: false,
      dialog2: false,
      dialog3: false,
    };
  },
  methods: {
    editar(item) {
      //se extrae el item a editar de la datatable
      this.editDataRow = item;
      this.dialog1 = true;
    },
    mostrarTipo(item) {
      //se extrae el item a mostrar de la datatable
      this.showDataRow = item;
      this.dialog3 = true;
      this.getAllTypes();
    },
    eliminar(item) {
      //se extrae el item a eliminar de la datatable
      this.deleteDataRow = item;
      this.dialog2 = true;
    },

    //método de eliminación al confirmar
    deletePhase() {
      PhaseService.delete(this.deleteDataRow.id)
        .then((response) => {
          //Toast de hecho
          Notify.done("deletePhase");
          this.getAllPhases();
          this.dialog2 = false;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al eliminar
          Notify.error("deleteData");
        });
    },
    //método de modificar al confirmar
    updatePhase() {
      if (this.editDataRow.name === "") {
        //Advertencia
        Notify.fillFields("form-phase");
      } else {
        //Petición para guardar el proyecto
        PhaseService.existName(this.editDataRow.name).then((response) => {
          if (response.data === true) {
            Notify.fillFields("valid-phase");
          } else {
            PhaseService.update(this.editDataRow, this.editDataRow.id)
              .then((response) => {
                //Toast de hecho
                Notify.done("updatePhase");
                this.dialog1 = false;
                this.getAllPhases();
              })
              .catch((e) => {
                //Toast de error al guardar
                Notify.error("saveData");
                console.log(e);
              });
          }
        });
      }
    },
    //llenado de la lista de fases con la petición de la API
    getAllPhases() {
      PhaseService.listAll()
        .then((response) => {
          this.item = response.data; //llenado
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },

    //llenado de la lista de tipos con la petición de la API
    getAllTypes() {
      //se manda a la petición el id de la fase (guardado en showData)
      TypePhaseService.getTypeByPhase(this.showDataRow.id)
        .then((response) => {
          let result = response.data;
          //si el arrglo contiene algo llena la lista
          if (result.length > 0) {
            this.types = result;
          } else {
            //si no hay tipos asigandos, se crea un objeto vacío con la estructura de tipo
            this.types = [
              {
                type: {
                  id: 0,
                  //de tal manera que en el datatable muestre el mensaje: 
                  name: "Aún no hay tipos asignados",
                },
              },
            ];
          }
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
          Notify.error("getData");
        });
    },
  },
  mounted() {
    //llenado al cargar la vista
    this.getAllPhases();
  },
};
</script>