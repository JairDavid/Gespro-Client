<template>
  <div>
    <v-container>
      <v-row align="center" class="pb-0">
        <v-col cols="12" sm="6">
          <h1 class="font-weight-black text-h4 mt-2">
            Perfil de usuario<v-sheet color="black" height="3"></v-sheet>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="7">
          <h6 class="font-weight-bold text-h6 mb-2">Datos de usuario</h6>
          <v-row no-gutters>
            <v-col cols="12" sm="12">
              <h6 class="subtitle-1 mb-2">Nombre completo:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-account-circle"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" sm="12">
              <h6 class="subtitle-1 mb-2">Domicilio:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-home"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">Fecha de nacimiento:</h6>
              <v-text-field
                type="date"
                prepend-icon=""
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Teléfono:</h6>
              <v-text-field
                outlined
                dense
                color="#A93226"
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
              <h6 class="subtitle-1 mb-2">Rol:</h6>
              <v-text-field
                outlined
                disabled
                dense
                color="#A93226"
                prepend-inner-icon="mdi-account-supervisor"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1"></v-col>
            <v-col cols="12" sm="6">
              <h6 class="subtitle-1 mb-2">Correo electrónico:</h6>
              <v-text-field
                outlined
                dense
                disabled
                color="#A93226"
                prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4">
          <h6 class="font-weight-bold text-h6 mb-2 mr-6">Cambiar Contraseña</h6>
          <h6 class="subtitle-1 mb-2">Nueva contraseña:</h6>
          <v-text-field
            outlined
            dense
            color="#A93226"
            prepend-inner-icon="mdi-lock"
            placeholder="* * * * * * "
          ></v-text-field>
          <h6 class="subtitle-1 mb-2">Confirmar contraseña:</h6>
          <v-text-field
            outlined
            dense
            color="#A93226"
            prepend-inner-icon="mdi-lock"
            placeholder="* * * * * *"
          ></v-text-field>

          <div align="center" justify="center">
            <v-btn color="#A93226" rounded style="aling: center">
              <v-icon class="mr-2 white--text">mdi-content-save</v-icon>
              <span class="mr-2 white--text">Guardar Cambios</span>
            </v-btn>
            <v-btn color="#E0E0E0" class="mt-9" rounded>
              <v-icon class="mr-2 black--text">mdi-keyboard-backspace</v-icon>
              <span class="mr-2 black--text">Regresar</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UserProfile"
};
</script>