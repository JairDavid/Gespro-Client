import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import('../views/coordinator views/HomeCoordinator.vue')
  },
  {
    path: '/addProject',
    name: 'nuevoProyecto',
    component: () => import('../views/coordinator views/AddProject.vue')
  },
  {
    path: '/deleteProject',
    name: 'eliminarProyecto',
    component: () => import('../views/coordinator views/DeleteProject.vue')
  },
  {
    path: '/btnDeleteProject/:id',
    name: 'btnEliminarProyecto',
    component: () => import('../views/coordinator views/DeleteProject.vue')
  },
  {
    path: '/searchProject',
    name: 'buscarProyecto',
    component: () => import('../views/coordinator views/SearchProject.vue')
  },
  {
    path: '/btnSearchProject/:id',
    name: 'btnBuscarProyecto',
    component: () => import('../views/coordinator views/SearchProject.vue')
  },
  {
    path: '/updateProject',
    name: 'actualizarProyecto',
    component: () => import('../views/coordinator views/UpdateProject.vue')
  },
  {
    path: '/btnUpdateProject/:id',
    name: 'btnActualizarProyecto',
    component: () => import('../views/coordinator views/UpdateProject.vue')
  },
  {
    path: '/generalProject',
    name: 'busquedaDeProyectos',
    component: () => import('../views/coordinator views/GeneralProject.vue')
  },
  ///////////////////Controller routes////////////////////////
  {
    path: '/homeController',
    name: 'inicioControlador',
    component: () => import('../views/controller views/HomeController.vue')
  },
  {
    path: '/phase',
    name: 'fases',
    component: () => import('../views/controller views/Phase.vue')
  },
  {
    path: '/deliverable',
    name: 'entregables',
    component: () => import('../views/controller views/Deliverable.vue')
  },
  {
    path: '/type',
    name: 'tipos',
    component: () => import('../views/controller views/Type.vue')
  },
  {
    path: '/fillType',
    name: 'llenarTipo',
    component: () => import('../views/controller views/FillType.vue')
  },
  ///////////////////Human resources routes////////////////////////
  {
    path: '/homeHumanResources',
    name: 'inicioRecursosHumanos',
    component: () => import('../views/human resources views/HomeHumanResources.vue')
  },
  {
    path: '/addEmploye',
    name: 'nuevoEmpleado',
    component: () => import('../views/human resources views/Employe/AddEmploye.vue')
  },
  {
    path: '/deleteEmploye',
    name: 'eliminarEmpleado',
    component: () => import('../views/human resources views/Employe/DeleteEmploye.vue')
  },
  {
    path: '/consultEmploye',
    name: 'consultaEmpleado',
    component: () => import('../views/human resources views/Employe/ConsultEmploye.vue')
  },
  {
    path: '/consultAll',
    name: 'consultaEmpleados',
    component: () => import('../views/human resources views/Employe/ConsultTableEmploye.vue')
  },
  {
    path: '/updateEmploye',
    name: 'actualizarEmpleado',
    component: () => import('../views/human resources views/Employe/ModifyEmploye.vue')
  },
  {
    path: '/labor',
    name: 'puesto',
    component: () => import('../views/human resources views/Labor.vue')
  },
  {
    path: '/user',
    name: 'usuario',
    component: () => import('../views/human resources views/User.vue')
  },
  ///////////////////Project Manager routes////////////////////////
  {
    path: '/homeProjectManager',
    name: 'inicioAdministradorDeProyectos',
    component: () => import('../views/project manager views/HomeProjectManager.vue')
  },
  {
    path: '/checkDeliverable',
    name: 'consultarEntregables',
    component: () => import('../views/project manager views/CheckDeliverable.vue')
  },
  {
    path: '/checkProgress',
    name: 'consultarProgreso',
    component: () => import('../views/project manager views/CheckProgress.vue')
  },
  {
    path: '/manageResources',
    name: 'gestionarRecursos',
    component: () => import('../views/project manager views/ManageResource.vue')
  },

  ///////////////////Employe routes////////////////////////
  {
    path: '/homeEmploye',
    name: 'inicioEmpleado',
    component: () => import('../views/employe views/HomeEmploye.vue')
  },
  {
    path: '/upload',
    name: 'subirEvidencia',
    component: () => import('../views/employe views/UploadEvidences.vue')
  },
  {
    path: '/UpDown',
    name: 'subirBajarEntregable',
    component: () => import('../views/employe views/DeliverableUpDown.vue')
  },
  ///////////////////////// Extern views ////////////////////////
  {
    path: '/profile',
    name: 'perfil',
    component: () => import('../views/Profile.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
