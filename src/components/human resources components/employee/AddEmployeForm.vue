<template>
  <v-container>
    <v-row align="center" class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Añadir empleado
            <v-sheet color="black" height="3"></v-sheet>
          </h1>
        </div>
        <h3>Datos del empleado</h3>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <h6 class="mb-2 subtitle-1">Nombre del empleado:</h6>
        <v-text-field
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-circle"
          v-model="employe.fullName"
          :rules="nameRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="3">
        <h6 class="mb-2 subtitle-1">CURP:</h6>
        <v-text-field
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-box"
          v-model="employe.curp"
          :rules="curpRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="3">
        <h6 class="mb-2 subtitle-1">Fecha de nacimiento:</h6>
        <v-text-field
          type="date"
          min
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-calendar-range"
          v-model="employe.birthDate"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="4">
        <h6 class="mb-2 subtitle-1">Domicilio:</h6>
        <v-text-field
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-home"
          v-model="employe.adress"
          :rules="adressRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>

      <v-col cols="12" sm="3">
        <h6 class="mb-2 subtitle-1">Teléfono:</h6>
        <v-text-field
          type="number"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-phone"
          v-model="employe.phoneNumber"
          :rules="phoneRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="3">
        <h6 class="mb-2 subtitle-1">Último grado de estudios:</h6>
        <v-text-field
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-school"
          v-model="employe.degree"
          :rules="degreeRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="4">
        <h6 class="mb-2 subtitle-1">Correo electrónico:</h6>
        <v-text-field
          type="email"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-email"
          v-model="employe.email"
          :rules="emailRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>

      <v-col cols="12" sm="3">
        <h6 class="mb-2 subtitle-1">Rol:</h6>
        <v-select
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-supervisor"
          v-bind:items="rol"
          v-model="employe.role.id"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="">
      <v-btn color="grayButton" rounded class="mr-2" @click="regresar()">
        <span class="black--text">Cancelar</span>
      </v-btn>
      <v-btn color="red" rounded class="ml-2" @click="camposVacios()">
        <span class="mr-1 ml-1 white--text">Añadir empleado</span>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import RolService from "../../../services/humanResource/service/RolService";
import Notify from "../../../notifications/Notify";
import EmployeService from "../../../services/humanResource/service/EmployeService";
export default {
  name: "AddEmployeForm",
  data() {
    return {
      employe: {
        id: null,
        fullName: "",
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
      emailValidation: {},
      curpValidation: {},
      employees: [],
      rol: [],
      nameRules: [
        (v) =>
          v.length <= 128 || "El nombre debe tener menos de 128 caracteres",
      ],
      curpRules: [
        (v) => v.length <= 18 || "El Curp debe de tener 18 carácteres",
      ],
      adressRules: [
        (v) =>
          v.length <= 45 || "El domicilio no puede tener más de 45 carácteres",
      ],
      phoneRules: [
        (v) =>
          v.length <= 10 || "El número de teléfono debe tener máximo 10 dígitos",
      ],
      emailRules: [
        (v) =>
          v.length <= 45 || "El correo no puede tener más de 45 carácteres",
      ],
      degreeRules: [
        (v) =>
          v.length <= 45 || "El correo no puede tener más de 45 carácteres",
      ],
    };
  },
  methods: {
    camposVacios() {
      if (
        this.employe.id === "" ||
        this.employe.fullName === "" ||
        this.employe.birthDate === "" ||
        this.employe.phoneNumber === "" ||
        this.employe.curp === "" ||
        this.employe.email === "" ||
        this.employe.adress === "" ||
        this.employe.degree === "" ||
        this.employe.role.id === ""
      ) {
        console.log(this.employe.fullName);
        Notify.fillFields("employeForm");
      } else {
        this.validarCampos();
      }
    },
    validarCampos() {
      if (
        this.employe.fullName.length <= 128 &&
        this.employe.curp.length === 18 &&
        this.employe.phoneNumber.length <= 10 &&
        this.employe.phoneNumber.length >= 5 &&
        this.employe.email.length <= 45 &&
        this.employe.adress.length <= 45 &&
        this.employe.degree.length <= 45
      ) {
        this.consultaCurp();
      } else {
        Notify.fillFields("validationData");
      }
    },
    consultaCurp() {
      EmployeService.consultaCurp(this.employe.curp)
        .then((response) => {
          this.curpValidation = response.data;
          if (this.curpValidation === "") {
            this.consultaEmail();
          } else {
            Notify.fillFields("curpInvalid");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    consultaEmail() {
      EmployeService.consultaEmail(this.employe.email)
        .then((response) => {
          this.emailValidation = response.data;
          if (this.emailValidation === "") {
            this.addEmploye();
          } else {
            Notify.fillFields("emailInvalid");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addEmploye() {
      this.employe.curp.toUpperCase;
      EmployeService.create(this.employe)
        .then((response) => {
          this.employe.id = null;
          this.employe.fullName = "";
          this.employe.birthDate = "";
          this.employe.phoneNumber = "";
          this.employe.curp = "";
          this.employe.email = "";
          this.employe.adress = "";
          this.employe.degree = "";
          this.employe.role.id = 0;
          Notify.done("employee");
        })
        .catch((e) => {
          Notify.error("saveData");
        });
    },
    getAllRol() {
      RolService.getAll()
        .then((response) => {
          this.rol = response.data;
        })
        .catch((e) => {
          Notify.error("getData");
        });
    },
    getAllEmploye() {
      EmployeService.listAll()
        .then((response) => {
          this.employe = response.data;
        })
        .catch((e) => {
          console.log(e);
          Notify.error("getData");
        });
    },
    regresar() {
      this.$router.push("/consultAll");
    },
  },
  mounted() {
    this.getAllRol();
  },
};
</script>