<template>
  <v-row justify="center" style="padding: 10%">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <a style="color: black" v-bind="attrs" v-on="on"
          ><u> Olvidé mi contraseña</u></a
        >
      </template>
      <v-card class="rounded-lg">
        <v-card-title class="red">
          <span class="headline" style="color: white">
            <v-icon color="white">mdi-email-lock</v-icon> 
            Recuperando mi contraseña
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <br />
            <h4>
              Ingrese el correo electrónico que le proporcionó recursos humanos.
            </h4>
            <br />
            <v-text-field
              color="red"
              v-model="email"
              outlined
              label="Correo electrónico"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
          </v-container>
          <small>* Verificaremos que su correo electrónico esté vigente.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Recuperar mi contraseña
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "RecoverPassword",
  data() {
    return {
      dialog: false,
      email: "",
    };
  },
};
</script>