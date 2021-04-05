<template>
  <div>
    <v-container>
      <v-row align="center" class="pb-0">
        <v-col cols="12" sm="6">
          <h1 class="font-weight-black text-h4 mt-2">
            Perfil de usuario<v-sheet color="black" height="3"></v-sheet>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="7">
          <h6 class="font-weight-bold text-h6 mb-2">Datos de usuario</h6>
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Nombre completo:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-account-circle"
                v-model="employee.fullName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">CURP:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-account-box"
                v-model="employee.curp"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Domicilio:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-home"
                v-model="employee.adress"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">Último grado de estudios:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-school"
                v-model="employee.degree"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Teléfono:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-phone"
                v-model="employee.phoneNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">Fecha de nacimiento:</h6>
              <v-text-field
                type="date"
                prepend-icon=""
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-calendar"
                v-model="employee.birthDate"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Correo electrónico:</h6>
              <v-text-field
                outlined
                dense
                disabled
                color="#A93226"
                prepend-inner-icon="mdi-email"
                v-model="employee.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">Rol:</h6>
              <v-text-field
                outlined
                disabled
                dense
                color="#A93226"
                prepend-inner-icon="mdi-account-supervisor"
                v-model="employee.role.name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4">
          <h6 class="font-weight-bold text-h6 mb-2 mr-6">Cambiar Contraseña</h6>
          <h6 class="subtitle-1 mb-2">Contraseña actual:</h6>
          <v-text-field
            outlined
            dense
            disabled
            color="#A93226"
            prepend-inner-icon="mdi-lock"
            placeholder="* * * * * * "
            v-model="employee.password"
          ></v-text-field>
          <h6 class="subtitle-1 mb-2">Nueva contraseña:</h6>
          <v-text-field
            outlined
            dense
            color="#A93226"
            prepend-inner-icon="mdi-lock"
            placeholder="* * * * * * "
            v-model="externPassword"
          ></v-text-field>
          <h6 class="subtitle-1 mb-2">Confirmar contraseña:</h6>
          <v-text-field
            outlined
            dense
            color="#A93226"
            prepend-inner-icon="mdi-lock"
            placeholder="* * * * * *"
            v-model="confirmPassword"
          ></v-text-field>

          <div align="center" justify="center">
            <v-btn
              color="red"
              rounded
              style="aling: center"
              @click="dialog = true"
            >
              <v-icon class="mr-2 white--text">mdi-content-save</v-icon>
              <span class="mr-2 white--text">Guardar Cambios</span>
            </v-btn>
            <v-btn color="#E0E0E0" class="mt-4" rounded @click="back()">
              <v-icon class="mr-2 black--text">mdi-keyboard-backspace</v-icon>
              <span class="mr-2 black--text">Regresar</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" width="600" persistent>
        <v-card class="rounded-lg">
          <v-card-title class="red">
            <span class="headline" style="color: white">
              <v-icon color="white">mdi-pencil</v-icon>¿Estás seguro que quieres
              actualizar tus datos?
            </span>
          </v-card-title>
          <v-card-text class="mt-5">
            <span class="black--text">
              Una vez hecho los cambios puedes volver a editarlos de
              nuevo.</span
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
              @click="(dialog = false), updateProfile()"
            >
              Sí, guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import EmployeService from "../services/humanResource/service/EmployeService";
import router from "../router/index";
import Notify from "../notifications/Notify";
export default {
  name: "UserProfile",
  data() {
    return {
      employee: {
        id: 0,
        rol: "",
        fullName: "",
        birthDate: "",
        phoneNumber: "",
        curp: "",
        email: "",
        adress: "",
        degree: "",
        password: "",
        status: true,
        role: {
          id: 0,
          name: "",
        },
      },
      externPassword: "",
      confirmPassword: "",
      dialog: false,
    };
  },
  methods: {
    updateProfile() {
      if (this.externPassword === this.confirmPassword) {
        this.employee.password = this.externPassword;
        let id = localStorage.getItem("sysin");
        EmployeService.edit(id, this.employee)
          .then((response) => {
            Notify.done("profileUpdate");
            this.back();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        Notify.info("notEqualPassword");
        this.dialog = false;
      }
    },
    getDataProfile() {
      let id = localStorage.getItem("sysin");
      EmployeService.getOne(id)
        .then((response) => {
          this.employee = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    back() {
      let view = parseInt(localStorage.getItem("sysrl"));
      switch (view) {
        case 1:
          router.push("/homeCoordinator");
          break;
        case 2:
          router.push("/homeController");
          break;
        case 3:
          router.push("/homeHumanResources");
          break;
        case 4:
          router.push("/homeProjectManager");
          break;
        case 5:
          router.push("/homeEmploye");
          break;
      }
    },
  },
  mounted() {
    this.getDataProfile();
  },
};
</script>