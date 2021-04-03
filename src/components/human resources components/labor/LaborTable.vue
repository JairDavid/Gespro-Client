<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <!--@reload="" lo que va despues del arroba es como esta en nuestro 
     componente y lo que esta en comillas el nombre del metodo -->
      <AddLabor @reload="getAllLabor" />
    </div>
    <v-card>
      <v-card-title>
        Lista de puestos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Nombre del puesto"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="encabezado"
        :items="labors"
        :items-per-page="5"
        :search="search"
      >
        <template v-slot:[`item.modificar`]="{ item }">
          <v-btn rounded color="greenButton" @click="modificar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.eliminar`]="{ item }">
          <v-btn rounded color="yellowButton" @click="eliminar(item)">
            <v-icon class="white--text">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-pencil</v-icon> Modificar puesto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-text-field
            prepend-inner-icon="mdi-briefcase"
            outlined
            color="red"
            v-model="editDataRow.name"
            label="Puesto"
            class="mt-2"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="(dialog1 = false), getAllLabor()"
          >
            Cancelar
          </v-btn>
          <v-btn elevation="2" color="green darken-1" text @click="editLabor()">
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-delete</v-icon> Eliminar puesto
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h4 style="text-align: center" class="black--text">
              ¿Estas seguro que deseas eliminar el puesto de "{{
                deleteDataRow.name
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
            @click="dialog2 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="deleteLabor()"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Notify from "../../../notifications/Notify";
import LaborService from "../../../services/humanResource/service/LaborService";
import AddLabor from "./AddLabor";
export default {
  name: "LaborTable",
  components: {
    AddLabor,
  },
  data() {
    return {
      labor: {
        id: null,
        name: "",
      },
      search: "",
      encabezado: [
        { text: "Nombre del puesto", align: "start", value: "name" },
        { text: "Modificar", align: "center", value: "modificar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      labors: [],
      dialog1: false,
      dialog2: false,
      //Objeto para editar
      editDataRow: {},
      //Para eliminar
      deleteDataRow: {},
      //Validacion
      nameValidation: {},
      //Variable para guardar el nombre original
      originalName: "",
    };
  },
  methods: {
    //asigna los datos a un objeto
    modificar(item) {
      this.dialog1 = true;
      this.editDataRow = item;
    },
    eliminar(item) {
      this.dialog2 = true;
      this.deleteDataRow = item;
    },
    deleteLabor() {
      //Elmina mediante el id
      LaborService.eliminar(this.deleteDataRow.id)
        .then((response) => {
          Notify.done("deleteLabor");
          this.getAllLabor();
          this.dialog2 = false;
        })
        .catch((e) => {
          Notify.error("saveData");
        });
    },
    editLabor() {
      //Validacion de si esta vacio
      if (this.editDataRow.name === "") {
        //Envia mensaje de que es necesario que este lleno
        Notify.fillFields("updateLabor");
      } else {
        //Si no esta vacio llama al metodo el getName para buscar
        LaborService.getName(this.editDataRow.name)
        .then((response)=>{
          //verifica si el nombre no es nulo o si esta vacio, si es nulo manda el mensaje
          if(response.data===true){
            Notify.fillFields("laborInvalid");
          }else{
            //Manda  llamar a mi metodo de editar en el cual le mando el id y despues mi objeto
            LaborService.edit(this.editDataRow.id, this.editDataRow)
            .then((response)=>{
              Notify.done("updateLabor");
              this.dialog1=false;
              this.getAllLabor();
            })
            .catch((e)=>{
              console.log(e);
            });
          }
        }).catch((e)=>{
          console.log(e);
        })
      }
    },
    //consulta todos los puestos en la base de datos
    getAllLabor() {
      LaborService.getAll()
        .then((response) => {
          this.labors = response.data;
        })
        .catch((e) => {
          Notify.error("getData");
        });
    },
  },
  mounted() {
    this.getAllLabor();
  },
};
</script>
import AddLabor from "./AddLabor";
export default {
  name: "LaborTable",
  components: {
    AddLabor,
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre del puesto", align: "start", value: "name" },
        { text: "Modificar", align: "center", value: "modificar" },
        { text: "Eliminar", align: "center", value: "eliminar" },
      ],
      puesto: [
        { name: "Admin" },
        { name: "Programador" },
        { name: "Secretario" },
        { name: "Tesorero" },
        { name: "Marketing" },
        { name: "Tester" },
      ],
      dialog1: false,
      dialog2: false,
      editDataRow: {},
      deleteDataRow: {},
    };
  },
  methods: {
    modificar(item) {
      this.dialog1 = true;
      this.editDataRow = item;
    },
    eliminar(item) {
      this.dialog2 = true;
      this.deleteDataRow = item;
    },
  },
};
</script>