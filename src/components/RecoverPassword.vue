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
            @click="(dialog = false), clear()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog = false), enviarcorreo()"
          >
            Recuperar mi contraseña
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--para enviar el token-->

    <v-dialog v-model="dialog1" persistent max-width="600px">
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
            <h4>Ingrese el token que se le envió a su correo.</h4>
            <br />
            <v-text-field
              color="red"
              v-model="tokenemail"
              outlined
              label="Token"
              prepend-inner-icon="mdi-key-variant"
            ></v-text-field>
          </v-container>
          <small>* Verificaremos que su el token coincida.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="(dialog1 = false), clear()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog1 = false), cambiar()"
          >
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="600px">
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
            <h4>Ingrese su nueva contraseña.</h4>
            <br />
            <v-text-field
              color="red"
              v-model="newpassword"
              outlined
              label="Nueva contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <v-text-field
              color="red"
              v-model="confirmpassword"
              outlined
              label="Confirmar contraseña"
              type="password"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            color="blue-grey darken-1"
            text
            @click="(dialog2 = false), clear()"
          >
            Cancelar
          </v-btn>
          <v-btn
            elevation="2"
            color="green darken-1"
            text
            @click="(dialog2 = false), savepassword()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
import Notify from "../notifications/Notify";
export default {
  name: "RecoverPassword",
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      email: "",
      tokenemail: "",
      tokensend: "",
      newpassword: "",
      confirmpassword: "",
    };
  },
  methods: {
    enviarcorreo() {
      if (this.email === "") {
        Notify.fillFields("missingEmail");
        this.dialog = true;
      } else {
        let token = Math.random().toString(36).substr(2);
        axios({
          url: `http://100.25.145.27:2500/correo/recuperar/${this.email}/${token}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            Notify.done("sendToken");
            this.tokensend = token;
            this.dialog1 = true;
          })
          .catch((e) => {
            console.log(e);
            Notify.error("sendData");
            this.dialog = false;
          });
      }
    },
    cambiar() {
      if(this.tokenemail ===""){
        Notify.fillFields("missingToken");
        this.dialog1 = true;
      }else if (this.tokensend === this.tokenemail) {
        this.dialog2 = true;
      } else {
        Notify.fillFields("tokenInvalid");
        this.dialog1 = true;
      }
    },
    savepassword() {
      if (this.newpassword === "" || this.confirmpassword === "") {
        Notify.fillFields("employeForm");
      } else if (this.newpassword === this.confirmpassword) {
        axios({
          url: `http://192.168.0.5:2500/contrasena/actualizarContrasena/${this.email}/${this.newpassword}`,
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => {
            Notify.done("password");
            this.dialog2 = false;
            this.clear();
          })
          .catch((e) => {
            console.log(e);
            Notify.error("saveData");
            this.dialog2 = false;
          });
      } else {
        Notify.info("notEqualPassword");
        this.dialog2 = true;
      }
    },
    clear() {
      this.tokenemail = "";
      this.tokensend = "";
      this.email = "";
      this.newpassword = "";
      this.confirmpassword = "";
    },
  },
};
</script>