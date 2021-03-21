<template>
  <v-sheet color="red" height="70%">
    <v-container class="d-flex">
      <v-container class="ml-4 mt-16">
        <div class="mt-10">
          <h1 class="font-weight-bold white--text text-h3">
            Bienvenido a GESPRO
          </h1>
          <h1 class="font-weight-light white--text text-h3">Controlador</h1>
        </div>
      </v-container>
      <div class="float-sm-right">
        <v-img
          src="../../assets/gesApp.svg"
          class="mt-16 mb-13"
          contain
          width="400"
          height="auto"
        />
      </div>
    </v-container>
    <Footer />
  </v-sheet>
</template>

<script>
import Footer from "../../components/Footer";
export default {
  name: "Controller",
  components: {
    Footer,
  },
};
</script>