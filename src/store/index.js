import Vue from 'vue'
import Vuex from 'vuex'
import EmployeeService from "../services/humanResource/service/EmployeService";
import Auth from "../services/login/AuthService";
import router from "../router/index";
import Notify from '../notifications/Notify';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
  },
  getters: {
    getStatusLogin: state => { return state.loggingIn; }
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state) => {
      state.loggingIn = false;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.loggingIn = false;
    }
  },
  actions: {
    async doLogin({ commit }, loginData) {
      commit('loginStart');
      await Auth.getSession(loginData)
        .then((response) => {
          commit('updateAccessToken', response.data.jwt);
          localStorage.setItem('accessToken', this.state.accessToken);
        }).catch((e) => {
          commit('loginStop');
          Notify.info("userNotFund");
        });
      await EmployeeService.consultaEmailAxios(loginData.username, this.state.accessToken)
        .then((response) => {
          if(response.data.status === false){
            Notify.info("statusFalse");
          }else if (response.data.password == loginData.password && response.data.email == loginData.username) {
            localStorage.setItem('sysrl', response.data.role.id);
            localStorage.setItem('sysin', response.data.id);
            switch (response.data.role.id) {
              case 1:
                //rol coordinador
                router.replace("/homeCoordinator");
                break;
              case 2:
                //rol controlador
                router.replace("/homeController");
                break;
              case 3:
                //rol recursos humanos
                router.replace("/homeHumanResources");
                break;
              case 4:
                //rol administrador de proyectos
                router.replace("/homeProjectManager");
                break;
              case 5:
                //rol empleado
                router.replace("/homeEmploye");
                break;
            }
          } else {
            commit('loginStop');
            localStorage.removeItem('accessToken');
          }
        })
        .catch((e) => {
          commit('loginStop');
          localStorage.removeItem('accessToken');
        });
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('sysrl');
      localStorage.removeItem('sysin');
      commit('logout');
      router.replace('/');
    }
  },
  modules: {
  }
})