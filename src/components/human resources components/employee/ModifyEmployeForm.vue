<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Modificar empleado
            <v-sheet color="black" height="3"></v-sheet>
          </h1>
        </div>
        <h3>Datos del empleado</h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          class="mt-2"
          outlined
          dense
          color="red"
          placeholder="Curp"
          prepend-inner-icon="mdi-magnify"
          v-model="param"
        ></v-text-field>
      </v-col>
      <v-col class="mt-2" cols="12" sm="6" md="1">
        <v-btn color="red" rounded @click="searchByCurp()">
          <span class="white--text">Buscar</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <h6 class="subtitle-1">Nombre del empleado:</h6>
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
        <h6 class="subtitle-1">CURP:</h6>
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
        <h6 class="subtitle-1">Fecha de nacimiento:</h6>
        <v-text-field
          type="date"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-calendar"
          v-model="employe.birthDate"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="4">
        <h6 class="subtitle-1">Dirección:</h6>
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
        <h6 class="subtitle-1">Teléfono:</h6>
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
        <h6 class="subtitle-1">Grado de estudio:</h6>
        <v-text-field
          type="email"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-school"
          v-model="employe.degree"
          :rules="degreeRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="4" md="4">
        <h6 class="subtitle-1">Correo electrónico:</h6>
        <v-text-field
          disabled
          type="email"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-email"
          v-model="employe.email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>

      <v-col cols="12" sm="3">
        <h6 class="subtitle-1">Rol:</h6>
        <v-select
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-supervisor"
          :label="employe.role.name"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="pb-4" align="center" justify="center">
      <v-btn color="grayButton" rounded class="mr-2" @click="regresar()">
        <span class="black--text">Cancelar</span>
      </v-btn>

      <v-btn color="red" rounded class="ml-2" @click="valid()">
        <span class="mr-1 ml-1 white--text">Modificar empleado</span>
      </v-btn>

      <v-dialog v-model="dialog" width="600" persistent>
        <v-card class="rounded-lg">
          <v-card-title class="red">
            <span class="headline" style="color: white">
              <v-icon color="white">mdi-pencil</v-icon>¿Estás seguro que quieres
              actualizar {{ this.employe.fullName }}?
            </span>
          </v-card-title>
          <v-card-text class="mt-5">
            <span class="black--text">
              Verifica los datos antes de actualizar.</span
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
              @click="(dialog = false), camposVacios()"
            >
              Modificar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import EmployeService from "../../../services/humanResource/service/EmployeService";
import RolService from "../../../services/humanResource/service/RolService";
import Notify from "../../../notifications/Notify";
export default {
  name: "ModifyEmployeForm",
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
          name: "",
        },
        password: "",
        status: 1,
      },
      //parametro de busqueda con el cual puedo consultar un curp existente
      param: "",
      dialog: false,
      employees: [],
      //curp original se usa para guardar el curp de busqeuda, mas adelante se explica
      curpOriginal: "",
      //Objeto el cual uso para asignar los datos de una consulta es posible que no lo use
      curpValidation: {},
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
      degreeRules: [
        (v) =>
          v.length <= 45 || "El correo no puede tener más de 45 carácteres",
      ],
    };
  },
  methods: {
    camposVacios() {
      //Checo si los campos estan vacios, se omitieron unos
      //como lo es estado el cual por default es 1 (Esta activo)
      //Es decir se encuentra activo, otro es la contraseña,
      //la cual es la misma que el correo, pero eso se realiza en el api
      //tambien el correo y el rol ya que esto no pueden modificarse
      if (
        this.employe.fullName === "" ||
        this.employe.birthDate === "" ||
        this.employe.phoneNumber === "" ||
        this.employe.curp === "" ||
        this.employe.adress === "" ||
        this.employe.degree === ""
      ) {
        //De ser así envia un mensaje diciendo que es obligatorio
        Notify.fillFields("employeForm");
      } else {
        //Y si no manda a llamar a la siguiente metodo para validar
        this.validarCampos();
      }
    },
    validarCampos() {
      //Checo que cada uno de estos datos cumpla con la longitud disponible en la base de datos
      if (
        this.employe.fullName.length <= 128 &&
        this.employe.curp.length === 18 &&
        this.employe.phoneNumber.length <= 10 &&
        this.employe.phoneNumber.length >= 5 &&
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
    //Consulto por el id
    getOne(id) {
      //Le mando el id
      EmployeService.getOne(id)
        .then((response) => {
          //Asigno lo de mi objeto a response data
          this.employe = response.data;
          //Y aqui solo guardo el curp ya que es el que nos interesa
          this.curpOriginal = response.data.curp;
        })
        .catch((e) => {
          Notify.error("getData");
        });
    },
    consultaCurp() {
      //Checa si el curp del empleado coincide con el que habia guardado
      if (this.employe.curp === this.curpOriginal) {
        //Mando a llamar a mi método
        this.updateEmploye();
      } else {
        //Mando el curo de mi objeto
        EmployeService.consultaCurp(this.employe.curp)
          .then((response) => {
            //En caso de no tener nada manda a llamar a mi metodo de actualizar
            if (response.data === "") {
              this.updateEmploye();
            } else {
              // Y si no le envia un mensaje
              Notify.fillFields("curpInvalid");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    valid() {
      //En caso de que el id sea nulo se envia un mensaje
      if (this.employe.id === null) {
        Notify.fillFields("searchEmploye");
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    },
    updateEmploye() {
      //Se actualiza mando el id y despues el objeto
      EmployeService.edit(this.employe.id, this.employe).then((response) => {
        this.employe.id = null;
        this.employe.firstName = "";
        this.employe.lastName = "";
        this.employe.birthDate = "";
        this.employe.phoneNumber = "";
        this.employe.curp = "";
        this.employe.adress = "";
        this.employe.degree = "";
        Notify.done("updateEmploye");
        this.$router.push("/consultAll");
      });
    },
    searchByCurp() {
      //Mando el parametro con el cual mando a traer mi objeto correpondiente
      if (this.param === "") {
        //Si no encuentra ese curp en alguno de mis empleados manda este mensaje
        Notify.fillFields("searchEmploye");
      } else {
        //Y si no esta vacio compara que el metodo 
        EmployeService.consultaCurp(this.param)
          .then((response) => {
            //En caso de no encontrar nada le envia el mensaje
            if (response.data.id === undefined) {
              Notify.info("employeNotFund");
            } else {
              this.employe = response.data;
            }
          })
          .catch((response) => {
            Notify.error("getData");
          });
      }
    },
    //consulta general a roles
    getAllRol() {
      RolService.getAll()
        .then((response) => {
          this.rol = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          Notify.error("getData");
          console.log(e);
        });
    },
    //me regresa a la tabla de consulta general
    regresar() {
      this.$router.push("/consultAll");
    },
  },
  mounted() {
    if (this.$route.params.id == undefined) {
    } else {
      this.getOne(this.$route.params.id);
    }
  },
};
</script>