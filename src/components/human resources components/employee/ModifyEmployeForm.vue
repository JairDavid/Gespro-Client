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
      param:"",
      dialog:false,
      employees: [],
      curpOriginal:"",
      curpValidation:{},
      rol: [],
       nameRules: [
        (v) =>
          v.length <= 128 || "El nombre debe tener menos de 128 caracteres",
      ],
      curpRules: [
        (v) => (v.length <= 18 || "El Curp debe de tener 18 carácteres"),
      ],
      adressRules: [
        (v) =>
          v.length <= 45 ||
          "El domicilio no puede tener más de 45 carácteres",
      ],
      phoneRules:{
        phoneRulesMin:
        (v)=>
        v.length>=5 || "El número de teléfono debe tener mínimo 5 dígitos"
      ,
      phoneRulesMax: 
        (v) =>
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
      if (
        this.employe.fullName === "" ||
        this.employe.birthDate === "" ||
        this.employe.phoneNumber === "" ||
        this.employe.curp === "" ||
        this.employe.adress === "" ||
        this.employe.degree === ""
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
        this.employe.adress.length <= 45 &&
        this.employe.degree.length <= 45
      ) {
        this.consultaCurp();
      } else {
        Notify.fillFields("validationData");
      }
    },
    consultaCurp() {      
      if(this.employe.curp===this.curpOriginal){
          this.updateEmploye();
      }else{
        EmployeService.consultaCurp(this.employe.curp)
          .then((response) => {
            if (response.data==="") {
              this.updateEmploye();          
            } else {
              Notify.fillFields("curpInvalid");
            }
          })
          .catch((e) => {
            console.log(e);
          });
        

      }
    },
    valid() {
      if (this.employe.id === null) {
        Notify.fillFields("searchEmploye");
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    },
    updateEmploye() {
      EmployeService.edit(this.employe.id, this.employe)
      .then((response) => {
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
      if (this.param === "") {
        Notify.fillFields("searchEmploye");
      } else {
        EmployeService.consultaCurp(this.param)
        .then((response) => {
          if (response.data.id === undefined) {
            Notify.info("employeNotFund");
          } else {
            this.employe=response.data;
          }
        })
        .catch((response)=>{
          Notify.error("getData");
        });
      }
    },
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
    getOne(id){
      
      EmployeService.getOne(id)
      .then((response)=>{
        this.employe=response.data;
        this.curpOriginal=response.data.curp;
      })
      .catch((response)=>{
        Notify.error("getData");
      });
    },
    regresar(){
      this.$router.push("/consultAll");
    },
  },
  mounted() {
    if(this.$route.params.id==undefined){

    }else{
      this.getOne(this.$route.params.id);
    }
  },
};
</script>