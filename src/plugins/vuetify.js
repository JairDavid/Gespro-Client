import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        red: "#AE2329",
        blueButton: "#0086DD",
        greenButton: "#00A06D",
        yellowButton: "#F6BB23",
        grayButton: "#E0E0E0",
        redButton: "#DA2C2C"
      },
    },
  },
});
