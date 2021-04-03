<template>
  <v-container>
    <v-row class="pb-0">
      <v-col cols="12" sm="6" md="5">
        <div class="d-flex flex-row">
          <h1 class="font-weight-black text-h4 mt-2">
            Buscar empleado
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
      <v-col cols="12" sm="4" md="3">
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
        <h6 class="subtitle-1">Grado de estudio:</h6>
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
    </v-row>
  </v-container>
</template>
<script>
import Notify from "../../../notifications/Notify";
import EmployeService from "../../../services/humanResource/service/EmployeService";
export default {
  name: "ConsultEmployeForm",
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
      param: "",
    };
  },
  methods: {
    //si esta vacio el parametro encia este mensaje
    searchByCurp() {
      if (this.param === "") {
        Notify.fillFields("searchEmploye");
      } else {
        //En caso de no estar así hace una consulta
        EmployeService.consultaCurp(this.param)
          .then((response) => {
            //Si no encuentra nada manda un mensaje
            if (response.data.id === undefined) {
              Notify.info("employeNotFund");
            } else {
              //Y si encuentra algo ya se muestra
              this.employe = response.data;
            }
          })
          .catch((response) => {
            console.log(response);
            Notify.error("getData");
          });
      }
    },
    //reresa a mi tabla
    regresar() {
      this.$router.push("/consultAll");
    },
  },
  mounted() {
    if (this.$route.params.id === undefined) {
    } else {
      this.getOne(this.$route.params.id);
    }
  },
};
</script>