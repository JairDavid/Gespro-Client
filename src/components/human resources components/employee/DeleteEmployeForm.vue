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
        ></v-text-field>
      </v-col>
      <v-col class="mt-2" cols="12" sm="6" md="1">
        <v-btn color="red" rounded>
          <span class="white--text">Buscar</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6">
        <h6 class="mt-2 subtitle-1">Nombre del empleado:</h6>
        <v-text-field
          outlined
          dense
          disabled
          color="red"
          prepend-inner-icon="mdi-account-circle"
        ></v-text-field>

        <h6 class="subtitle-1">CURP:</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-box"
        ></v-text-field>

        <h6 class="subtitle-1">Fecha de nacimiento:</h6>
        <v-text-field
          disabled
          type="date"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-calendar"
        ></v-text-field>
        <h6 class="subtitle-1">Correo electrónico:</h6>
        <v-text-field
          disabled
          type="email"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-email"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <h6 class="subtitle-1 mt-2">Apellido(s):</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-account-circle"
        ></v-text-field>

        <h6 class="subtitle-1">Dirección:</h6>
        <v-text-field
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-home"
        ></v-text-field>

        <h6 class="subtitle-1">Teléfono:</h6>
        <v-text-field
          disabled
          type="number"
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-phone"
        ></v-text-field>

        <h6 class="subtitle-1">Rol:</h6>
        <v-select
          disabled
          outlined
          dense
          color="red"
          prepend-inner-icon="mdi-briefcase"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-row class="pb-4" align="center" justify="center">
          <v-btn color="grayButton" rounded>
            <span class="black--text">Regresar</span>
          </v-btn>

          <v-btn color="red" rounded class="ml-2">
            <span class="mr-1 ml-1 white--text">Eliminar Empleado</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DeleteEmployeForm",
  data() {
    return {};
  },
};
</script>