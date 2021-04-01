<template>
  <div class="red" style="height: 100%">
    <v-container style="padding-top: 2%">
      <v-row no-gutters>
        <v-col>
          <v-card class="red" outlined tile>
            <v-card class="mx-auto rounded-xl" max-width="390">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <div
                    :class="`elevation-${hover ? 24 : 0}`"
                    class="mx-auto transition-swing"
                  >
                    <v-main>
                      <v-row justify="center" class="ma-5">
                        <h1>Iniciar Sesión</h1>
                      </v-row>
                    </v-main>
                    <v-main>
                      <v-row justify="center" class="ma-1">
                        <v-img
                          max-width="30%"
                          max-height="30%"
                          src="../assets/user-red.png"
                        >
                        </v-img>
                      </v-row>
                    </v-main>
                    <br />
                    <v-main class="ma-9 p-5">
                      <v-text-field
                        color="red"
                        v-model="email"
                        outlined
                        label="Correo electrónico"
                        prepend-inner-icon="mdi-email"
                      ></v-text-field>

                      <v-text-field
                        v-model="password"
                        color="red"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Contraseña"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                      <div
                        class="text-center"
                        style="padding-bottom: 5%; padding-top: 5%"
                      >
                        <v-btn
                          elevation="8"
                          width="69%"
                          rounded
                          color="red"
                          dark
                          @click="acceder()"
                          >Acceder</v-btn
                        >
                        <br />
                        <RecoverPassword />
                      </div>
                    </v-main>
                  </div>
                </template>
              </v-hover>
            </v-card>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="red mx-auto rounded-xl" outlined tile>
            <v-card
              class="pa-2 mx-auto rounded-xl"
              outlined
              tile
              max-width="477"
            >
              <v-img
                height="200%"
                width="200%"
                src="../assets/gespro_logo.jpg"
              ></v-img>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import RecoverPassword from "./RecoverPassword";
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      password: "",
      email: "",
    };
  },
  components: {
    RecoverPassword,
  },
  methods: {
    acceder() {
    this.$router.replace("/HomeEmploye");
    },
  },
};
</script>