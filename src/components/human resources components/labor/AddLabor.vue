<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded color="blueButton" dark v-bind="attrs" v-on="on">
        <v-icon left class="white--text">mdi-plus-circle</v-icon>
        Añadir puesto
      </v-btn>
    </template>
    <v-card class="rounded-lg">
      <v-card-title class="red">
        <span class="headline" style="color: white">
          <v-icon color="white">mdi-plus-circle</v-icon> Añadir puesto
        </span>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-text-field
          prepend-inner-icon="mdi-briefcase"
          outlined
          label="Puesto"
          color="red"
          class="mt-2"
          v-model="labor.name"
        >
        </v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          elevation="2"
          color="blue-grey darken-1"
          text
          @click="(dialog = false), limpiar()"
        >
          Cancelar
        </v-btn>
        <v-btn
          elevation="2"
          color="green darken-1"
          text
          @click="(dialog = false), nombreVacio()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Notify from "../../../notifications/Notify";
import LaborService from "../../../services/humanResource/service/LaborService";
export default {
  name: "AddLabor",
  data() {
    return {
      labor: {
        id: null,
        name: "",
      },
      nameValidation: {},
      labors: [],
      dialog: false,
    };
  },
  methods: {
    limpiar() {
      this.labor.id = null;
      this.labor.name = "";
      this.reload();
    },
    nombreVacio() {
      if (this.labor.id === "" || this.labor.name === "") {
        Notify.fillFields("laborForm");
        this.dialog = true;
      } else {
        this.consultarName();
      }
    },
    consultarName() {
      LaborService.getOneName(this.labor.name)
        .then((response) => {
          this.nameValidation = response.data;
          if (this.nameValidation === "") {
            this.addLabor();
          } else {
            this.dialog = true;
            Notify.fillFields("laborInvalid");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addLabor() {
      LaborService.getOneName(this.labor.name)
        .then((response) => {
          if (response.data === true) {
            Notify.fillFields("laborInvalid");
          } else {
            LaborService.create(this.labor)
              .then((response) => {
                this.labor.id = null;
                this.labor.name = "";
                Notify.done("labor");
                this.reload();
              })
              .catch((e) => {
                Notify.error("saveData");
                this.reload();
              });
          }
        })
        .catch((e) => {});
    },
    reload() {
      //emit trae los datos provenientes de otra vista
      this.$emit("reload");
    },
  },
  mounted() {},
};
</script>