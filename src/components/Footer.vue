<template>
    <v-footer padless class="aling-end white--text" color="red">
          <v-col
            class="text-center"
          >
            {{ new Date().getFullYear() }} — <strong>© Copyright 2021 GESPRO - Todos los derechos reservados</strong>
          </v-col>
        </v-footer>
</template>
<script>
  export default {
    name: 'Footer',
  }
</script>