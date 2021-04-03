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
          :rules="[phoneRules.phoneRulesMax, phoneRules.phoneRulesMin]"
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
      //Objeto principal
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
      //Objeto para ser asignado mas adelante
      emailValidation: {},
      //Objeto para ser asignado mas adelante
      curpValidation: {},
      employees: [],
      rol: [],
      //Mensajes a mostrar si no se cumple la longitud establecida
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
      phoneRules: {
        phoneRulesMin: (v) =>
          v.length >= 5 || "El número de teléfono debe tener mínimo 5 dígitos",
        phoneRulesMax: (v) =>
          v.length <= 10 ||
          "El número de teléfono debe tener máximo 10 dígitos",
      },
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
        //Checo si los campos estan vacios, se omitieron unos
        //como lo es estado el cual por default es 1 (Esta activo)
        //Es decir se encuentra activo y el otro es la contraseña,
        //la cual es la misma que el correo, pero eso se realiza en el api
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
        //De ser así envia un mensaje diciendo que es obligatorio
        Notify.fillFields("employeForm");
      } else {
        //Y si no manda a llamar a la siguiente metodo para validar
        this.validarCampos();
      }
    },
    validarCampos() {
      if (
        //Checo que cada uno de estos datos cumpla con la longitud disponible en la base de datos
        this.employe.fullName.length <= 128 &&
        this.employe.curp.length === 18 &&
        this.employe.phoneNumber.length <= 10 &&
        this.employe.phoneNumber.length >= 5 &&
        this.employe.email.length <= 45 &&
        this.employe.adress.length <= 45 &&
        this.employe.degree.length <= 45
      ) {
        //Si todo sale bien mando a llamar a mi siguiente metodo
        this.consultaCurp();
      } else {
        //Y si no manda un mensaje diciendo que se chequen los datos
        Notify.fillFields("validationData");
      }
    },
    consultaCurp() {
      //Mando a llamar a mi metodo consultar en el cual le mando el
      //curp que tiene mi obj employe
      EmployeService.consultaCurp(this.employe.curp)
        .then((response) => {
          //se asigna al objeto los resultados de la busqueda
          this.curpValidation = response.data;
          //En caso de no tener nada se envia al siguiente metodo
          if (this.curpValidation === "") {
            this.consultaEmail();
          } else {
            //Pero si coincide con otro manda mensaje diciendo que ya existe
            Notify.fillFields("curpInvalid");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    consultaEmail() {
      //Mando a llamar a mi metodo consultar en el cual le mando el
      //email que tiene mi obj employe
      EmployeService.consultaEmail(this.employe.email)
        .then((response) => {
          //se asigna al objeto los resultados de la busqueda
          this.emailValidation = response.data;
          //En caso de no tener nada se envia al siguiente metodo
          if (this.emailValidation === "") {
            this.addEmploye();
          } else {
            //Pero si coincide con otro manda mensaje diciendo que ya existe
            Notify.fillFields("emailInvalid");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addEmploye() {
      //Mando a llamar a mi metodo el crear el cual va a guardar mis datos
      //Aqui ya no es necesario hacer validaciones ya que todas estas se hicieron atras
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
          //Envia mensaje diciendo que se agrego
          Notify.done("employee");
          this.$router.push("/consultAll");
        })
        .catch((e) => {
          Notify.error("saveData");
        });
    },
    //Consulta a todos los roles
    getAllRol() {
      RolService.getAll()
        .then((response) => {
          this.rol = response.data;
        })
        .catch((e) => {
          Notify.error("getData");
        });
    },
    //Consulta  a todos los empleados creo que no se usa, pero no quise mover xd
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
    //Me manda a la tabla de consulta general
    regresar() {
      this.$router.push("/consultAll");
    },
  },
  mounted() {
    this.getAllRol();
  },
};
</script>