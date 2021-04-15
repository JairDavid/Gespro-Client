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
        <template v-slot:[`item.status`]="{ item }">
          <span v-text="getStatus(item.status)"> </span>
        </template>

        <template v-slot:[`item.activar`]="{ item }">
          <v-btn rounded color="blueButton" @click="activar(item)">
            <v-icon class="white--text">mdi-account-plus</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.editar`]="{ item }">
          <v-btn rounded color="greenButton" @click="editar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.desactivar`]="{ item }">
          <v-btn rounded color="yellowButton" @click="desactivar(item)">
            <v-icon class="white--text">mdi-account-minus</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!---->
    <v-dialog v-model="dialog1" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-account-plus</v-icon> Activar usuario
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h4 style="text-align: center" class="black--text">
              ¿Estás seguro que deseas activar el usuario de "{{
                activeDataRow.fullName
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
            @click="dialog1 = false"
            v-model="activeDataRow.status"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog1 = false), updateEstadoTrue()"
          >
            Activar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---->
    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="headline font-weight-bold red">
          <span class="headline" style="color: white">
            <v-icon color="white">mdi-pencil</v-icon> Modificar contraseña
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-text-field
            prepend-inner-icon="mdi-lock"
            outlined
            label="Nueva contraseña"
            color="red"
            class="mt-2"
            v-model="editDataRow.password"
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
            @click="(dialog2 = false), getAllEmploye()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog2 = false), updatePassword()"
          >
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" persistent max-width="600px">
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white"
            ><v-icon color="white">mdi-account-minus</v-icon> Desactivar usuario
          </span>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-container>
            <h4 style="text-align: center" class="black--text">
              ¿Estás seguro que deseas desactivar el usuario de "{{
                inactiveDataRow.fullName
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
            @click="dialog3 = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog3 = false), updateEstadoFalse()"
          >
            Desactivar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Notify from "../../../notifications/Notify";
import EmployeService from "../../../services/humanResource/service/EmployeService";
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
        { text: "Nombre del empleado", align: "start", value: "fullName" },
        { text: "Curp", align: "center", value: "curp" },
        { text: "Correo", align: "center", value: "email" },
        { text: "Estado", align: "center", value: "status" },
        { text: "Activar usuario", align: "center", value: "activar" },
        { text: "Editar contraseña", align: "center", value: "editar" },
        { text: "Desactivar usuario", align: "center", value: "desactivar" },
      ],
      employe: {
        id: null,
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        curp: "",
        email: "",
        adress: "",
        degree: "",
        role: {
          id: 0,
        },
        password: "",
        status: 1,
      },
      users: [],
      dialog1: false,
      dialog2: false,
      dialog3: false,
      activeDataRow: {},
      editDataRow: {},
      inactiveDataRow: {},
      estado: [],
    };
  },
  methods: {
    desactivar(item) {
      this.dialog3 = true;
      this.inactiveDataRow = item;
    },
    editar(item) {
      this.dialog2 = true;
      this.editDataRow = item;
    },
    activar(item) {
      this.dialog1 = true;
      this.activeDataRow = item;
    },
    //consulta todos los empleados
    getAllEmploye() {
      EmployeService.listAll()
        .then((response) => {
          this.users = response.data;
          this.users.map((item) => {
            if (item.status === true) {
              this.estado.push("Activo");
            }
          });
        })
        .catch((e) => {
          console.log(e);
          Notify.error("getData");
        });
    },
    //Actualiza la contraseña
    updatePassword() {
      if (this.editDataRow.password === "") {
        Notify.fillFields("updatePassword");
        this.dialog2 = true;
        this.getAllEmploye();
      } else {
        //Le manda el id y despues manda todo el objeto nuevo(en este caso solo manda la contraseña)
        EmployeService.edit(this.editDataRow.id, this.editDataRow)
          .then((response) => {
            Notify.done("password");
            this.dialog2 = false;
            this.getAllEmploye();
          })
          //Manda error al guardar
          .catch((response) => {
            Notify.error("saveData");
          });
      }
    },
    //Cambia el estado a falso
    updateEstadoFalse() {
      if (this.inactiveDataRow.status === false) {
        Notify.info("alertStatusFalse");
      } else {
        //Status=0 lo que quiere decir que esta inactivo
        this.inactiveDataRow.status = 0;
        EmployeService.edit(this.inactiveDataRow.id, this.inactiveDataRow)
          .then((response) => {
            Notify.done("statusUpdate");
            this.getAllEmploye();
          })
          .catch((response) => {
            Notify.error("errorStatus");
          });
      }
    },
    //Cambia el estado a true
    updateEstadoTrue() {
      if (this.activeDataRow.status === true) {
        Notify.info("alertStatusTrue");
      } else {
        //Status=1 lo que quiere decir que esta activo
        this.activeDataRow.status = 1;
        EmployeService.edit(this.activeDataRow.id, this.activeDataRow)
          .then((response) => {
            Notify.done("statusUpdate");
            this.getAllEmploye();
          })
          .catch((response) => {
            Notify.error("errorStatus");
          });
      }
    },
    getStatus(status) {
      if (status === true) {
        return "Activo";
      } else {
        return "Inactivo";
      }
    },
  },
  mounted() {
    this.getAllEmploye();
  },
};
</script>