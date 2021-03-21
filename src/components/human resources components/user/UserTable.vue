<template>
  <div>
    <div class="d-flex flex-row" style="margin-top: 2%; margin-bottom: 2%">
      <AddUser />
    </div>
    <v-card>
      <v-card-title>
        Lista de usuarios
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
        :items="users"
        :items-per-page="5"
        :search="search"
      >
        <template v-slot:[`item.editar`]="{ item }">
          <v-btn rounded color="greenButton" @click="editar(item)">
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
          <span class="headline" style="color: white">
            <v-icon color="white">mdi-pencil</v-icon> Modificar contraseña
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <span class="black--text">Asigne la nueva contraseña:</span>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            outlined
            label="Nueva contraseña"
            color="red"
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
            @click="dialog1 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog1 = false"
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
            ><v-icon color="white">mdi-delete</v-icon> Eliminar usuario
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h4 style="text-align: center" class="black--text">
              ¿Estás seguro que deseas eliminar el usuario de "{{
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
            @click="dialog2 = false"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddUser from "../user/AddUser";
export default {
  name: "UserTable",
  components: {
    AddUser,
  },
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre del empleado", align: "start", value: "name" },
        { text: "Curp", align: "center", value: "curp" },
        { text: "Correo", align: "center", value: "correo" },
        { text: "Editar contraseña", align: "center", value: "editar" },
        { text: "Eliminar usuario", align: "center", value: "eliminar" },
      ],
      users: [
        {
          name: "Abraham Cortez",
          curp: "PRUEBA12356",
          correo: "20193tn090@utez.edu.mx",
        },
        {
          name: "Alonso García",
          curp: "PRUEBA12356",
          correo: "20193tn091@utez.edu.mx",
        },
      ],
      dialog1: false,
      dialog2: false,
      deleteDataRow: {},
      editDataRow: {},
    };
  },
  methods: {
    editar(item) {
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