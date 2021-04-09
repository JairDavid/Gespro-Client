import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Auth.vue')
  },
  ///////////////////Coordinator routes////////////////////////
  {
    path: '/homeCoordinator',
    name: 'inicioCoordinador',
    component: () => import('../views/coordinator views/HomeCoordinator.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/addProject',
    name: 'nuevoProyecto',
    component: () => import('../views/coordinator views/AddProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/deleteProject',
    name: 'eliminarProyecto',
    component: () => import('../views/coordinator views/DeleteProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/btnDeleteProject/:id',
    name: 'btnEliminarProyecto',
    component: () => import('../views/coordinator views/DeleteProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/searchProject',
    name: 'buscarProyecto',
    component: () => import('../views/coordinator views/SearchProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/btnSearchProject/:id',
    name: 'btnBuscarProyecto',
    component: () => import('../views/coordinator views/SearchProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/updateProject',
    name: 'actualizarProyecto',
    component: () => import('../views/coordinator views/UpdateProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/btnUpdateProject/:id',
    name: 'btnActualizarProyecto',
    component: () => import('../views/coordinator views/UpdateProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/generalProject',
    name: 'busquedaDeProyectos',
    component: () => import('../views/coordinator views/GeneralProject.vue'),
    meta: {
      requireAuth: true,
    }
  },
  ///////////////////Controller routes////////////////////////
  {
    path: '/homeController',
    name: 'inicioControlador',
    component: () => import('../views/controller views/HomeController.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/phase',
    name: 'fases',
    component: () => import('../views/controller views/Phase.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/deliverable',
    name: 'entregables',
    component: () => import('../views/controller views/Deliverable.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/type',
    name: 'tipos',
    component: () => import('../views/controller views/Type.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/fillType',
    name: 'llenarTipo',
    component: () => import('../views/controller views/FillType.vue'),
    meta: {
      requireAuth: true
    }
  },
  ///////////////////Human resources routes////////////////////////
  {
    path: '/homeHumanResources',
    name: 'inicioRecursosHumanos',
    component: () => import('../views/human resources views/HomeHumanResources.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/addEmploye',
    name: 'nuevoEmpleado',
    component: () => import('../views/human resources views/Employe/AddEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/deleteEmploye',
    name: 'eliminarEmpleado',
    component: () => import('../views/human resources views/Employe/DeleteEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/btnDeleteEmploye/:id',
    name: 'btnEliminarEmpleado',
    component: () => import('../views/human resources views/Employe/DeleteEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/consultEmploye',
    name: 'consultaEmpleado',
    component: () => import('../views/human resources views/Employe/ConsultEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/consultAll',
    name: 'consultaEmpleados',
    component: () => import('../views/human resources views/Employe/ConsultTableEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/updateEmploye',
    name: 'actualizarEmpleado',
    component: () => import('../views/human resources views/Employe/ModifyEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/btnUpdateEmploye/:id',
    name: 'btnEditarEmpleado',
    component: () => import('../views/human resources views/Employe/ModifyEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/labor',
    name: 'puesto',
    component: () => import('../views/human resources views/Labor.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user',
    name: 'usuario',
    component: () => import('../views/human resources views/User.vue'),
    meta: {
      requireAuth: true
    }
  },
  ///////////////////Project Manager routes////////////////////////
  {
    path: '/homeProjectManager',
    name: 'inicioAdministradorDeProyectos',
    component: () => import('../views/project manager views/HomeProjectManager.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/checkDeliverable',
    name: 'consultarEntregables',
    component: () => import('../views/project manager views/CheckDeliverable.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/checkProgress',
    name: 'consultarProgreso',
    component: () => import('../views/project manager views/CheckProgress.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/manageResources',
    name: 'gestionarRecursos',
    component: () => import('../views/project manager views/ManageResource.vue'),
    meta: {
      requireAuth: true
    }
  },

  ///////////////////Employe routes////////////////////////
  {
    path: '/homeEmploye',
    name: 'inicioEmpleado',
    component: () => import('../views/employe views/HomeEmploye.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/upload',
    name: 'subirEvidencia',
    component: () => import('../views/employe views/UploadEvidences.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/btnUploadDeliverable/:id/:proyecto',
    name: 'btnSubirEvidencia',
    component: () => import('../views/employe views/DeliverableUpDown.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/UpDown',
    name: 'subirBajarEntregable',
    component: () => import('../views/employe views/DeliverableUpDown.vue'),
    meta: {
      requireAuth: true
    }
  },
  ///////////////////////// Extern views ////////////////////////
  {
    path: '/profile',
    name: 'perfil',
    component: () => import('../views/Profile.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.getters.getStatusLogin) {
      next({ name: "login" });
    }
  } else {
    next();
  }
  next();
})

export default router
