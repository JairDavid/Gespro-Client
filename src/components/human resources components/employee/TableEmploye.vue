<template>
  <div>
    <div
      class="d-flex flex-row"
      style="margin-top: 2%; margin-bottom: 2%"
    ></div>
    <v-card>
      <v-card-title>
        Lista de empleados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          color="red"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="encabezado"
        :items="users"
        :items-per-page="5"
        :search="search"
      >
        <template v-slot:[`item.editar`]="{ item }">
          <v-btn rounded color="greenButton" @click="editar(item)">
            <v-icon class="white--text">mdi-pencil</v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.eliminar`]="{ item }">
          <v-btn rounded color="yellowButton" @click="eliminar(item)">
            <v-icon class="white--text">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import Notify from '../../../notifications/Notify';
import EmployeService from '../../../services/humanResource/service/EmployeService';
export default {
  name: "TableEmploye",
  data() {
    return {
      search: "",
      encabezado: [
        { text: "Nombre del empleado", align: "start", value: "fullName" },
        { text: "Teléfono", align: "start", value: "phoneNumber" },
        { text: "Curp", align: "start", value: "curp" },
        { text: "Modificar", value: "editar" },
        { text: "Eliminar", value: "eliminar" },
      ],
      users: [],
      dialog: false,
    };
  },
  methods: {
    eliminar(item) {
      this.$router.push("/btnDeleteEmploye/"+ item.id);
    },
    editar(item) {
      this.$router.push("/btnUpdateEmploye/" + item.id);
    },
    getAllEmploye(){
      EmployeService.listAll()
      .then((response)=>{
        this.users=response.data;
      })
      .catch((e)=>{
        Notify.error("getData");
      });
    },
  },
  mounted(){
    this.getAllEmploye();
  },
};
</script>