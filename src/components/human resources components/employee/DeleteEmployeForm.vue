<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Eliminar empleado
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
          disabled
          color="red"
          prepend-inner-icon="mdi-account-circle"
          v-model="employe.fullName"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>

      <v-col cols="12" sm="3">
        <h6 class="subtitle-1">CURP:</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-box"
          v-model="employe.curp"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h6 class="subtitle-1">Fecha de nacimiento:</h6>
        <v-text-field
          disabled
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
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-home"
          v-model="employe.adress"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="3">
        <h6 class="subtitle-1">Teléfono:</h6>
        <v-text-field
          disabled
          type="number"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-phone"
          v-model="employe.phoneNumber"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h6 class="subtitle-1">Grado de estudios:</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-school"
          v-model="employe.degree"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1"></v-col>

      <v-col cols="12" sm="4">
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
      <v-row align="center" justify="center">
        <v-btn color="grayButton" rounded @click="regresar()">
          <span class="black--text">Regresar</span>
        </v-btn>
        <v-btn color="red" rounded class="ml-2" @click="valid()">
          <span class="mr-1 ml-1 white--text">Eliminar Empleado</span>
        </v-btn>

        <v-dialog v-model="dialog" width="600" persistent>
            <v-card class="rounded-lg">
              <v-card-title class="red">
                <span class="headline" style="color: white">
                  <v-icon color="white">mdi-delete</v-icon>¿Estás seguro que
                  quieres eliminar {{ this.employe.fullName }}?
                </span>
              </v-card-title>
              <v-card-text class="mt-5">
                <span class="black--text">
                  Esto será de forma permanente, verifica los datos antes de
                  eliminar.</span
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
                  @click="(dialog = false), deleteEmploye()"
                >
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-row>
  </v-container>
</template>

<script>
import Notify from '../../../notifications/Notify';
import EmployeService from '../../../services/humanResource/service/EmployeService';
export default {
  name: "DeleteEmployeForm",
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
    };
  },
  methods:{
    //checa que tenga un objeto, si no manda este mensaje
    valid(){
      if (this.employe.id==="") {
        Notify.fillFields("employeSearch");
        this.dialog=false;
      } else {
        this.dialog=true;
      }
    },
    deleteEmploye(){
      //Manda a llamar a mi metodo eliminar por eso mando el id
      EmployeService.eliminar(this.employe.id)
      .then((response)=>{
        //Manda mensaje de eliminacion
        Notify.done("deleteEmploye");
        //Me redirecciona a mi tabla de ocnsulta general
        this.$router.push("/consultAll");
      })
      .catch((response)=>{
          Notify.error("deleteData");
      });
    },
    searchByCurp(){
      //busca que el campo no este vacio
      if (this.param==="") {
        //Manda mensaje correspondiente
        Notify.fillFields("searchByCurp");
      } else {
        //realiza la consulta con el parametro antes ingresado
        EmployeService.consultaCurp(this.param)
        .then((response)=>{
          //Si no encuentra nada manda este mensaje
          if (response.data.curp=== undefined) {
            Notify.info("employeNotFund");
          } else {
            //Si encuentra algo ya lo muestra
            this.employe=response.data;
          }   
        })
        .catch((response)=>{
          Notify.error("getData");
        });
      }
    },
    getOne(id){
      //Consulta con el id
      EmployeService.getOne(id)
      .then((response)=>{
        this.employe=response.data;
      })
      .catch((response)=>{
        Notify.error("getData");
      });
    },
    regresar(){
      //Me regresa a mi tabla de consulta general
      this.$router.push("/consultAll");
    },
  },
  mounted(){
    if(this.$route.params.id==undefined){

    }else{
      this.getOne(this.$route.params.id);
    }
}
};
</script>