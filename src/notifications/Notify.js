import Vue from "vue";
import "vue-toastification/dist/index.css";
class Notify {
  fillFields(message) {
    let text = '';
    switch (message) {
      case 'searchInput':
        text = 'Debes ingresar el nombre del proyecto.'
        break;
      case 'uploadFile':
        text = 'Debes seleccionar un archivo o ingresar un nombre.'
        break;
      case 'form':
        text = 'Todos los campos son obligatorios; Excepto descripción.'
        break;
      case 'form-phase':
        text = 'Nombre obligatorio.'
        break;
      case 'form-type':
        text = 'Nombre obligatorio.'
        break;
      case 'valid-deliverable':
        text = 'El nombre del entregable debe ser único.'
        break;
      case 'valid-phase':
        text = 'El nombre de la fase debe ser único.'
        break;
      case 'forceToSearch':
        text = 'Primero debes buscar un proyecto.'
        break;
      case 'valid-project':
        text = 'El nombre del proyecto debe de ser único.'
        break;
      case 'valid-type':
        text = 'El nombre del tipo de proyecto debe de ser único.'
        break;
      case "anotherAdd":
        text = "Este empleado ya se encuentra registrado en este proyecto";
        break;
      case "adscrito":
        text = "Seleccione todos los campos por favor";
        break;
    }
    return Vue.$toast.warning(text, {
      position: "bottom-right",
      timeout: 2381,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    })
  }
  done(message) {
    let text;
    switch (message) {
      case 'project':
        text = 'Proyecto agregado'
        break;
      case 'employee':
        text = 'Empleado agregado'
        break;
      case 'type':
        text = "Tipo agregado"
        break;
      case 'deliverable':
        text = "Entregable agregado"
        break;
      case 'phase':
        text = 'Fase agregada'
        break;
      case 'deleteProject':
        text = 'Proyecto eliminado'
        break;
      case 'deleteType':
        text = 'Tipo de proyecto eliminado'
        break;
      case 'deletePhase':
        text = 'Fase eliminada'
        break;
      case 'deleteDeliverabla':
        text = 'Entregable eliminado'
        break;
      case 'updateProject':
        text = 'Proyecto actualizado'
        break;
      case 'updatePhase':
        text = 'Fase actualizada'
        break;
      case 'updateDeliverable':
        text = 'Entregable actualizado'
        break;
      case 'updateType':
        text = 'Tipo de proyecto actualizado'
        break;
    }
    return Vue.$toast.success(text + ' correctamente.', {
      position: "bottom-right",
      timeout: 2381,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    })
  }
  error(message) {
    let text;
    switch (message) {
      case "add":
        text = "al agregar, verifique los datos.";
        break;

      case "delete":
        text = "al borrar, verifique los datos.";
        break;
      case "update":
        text = "al actualizar, verifique los datos.";
        break;
      case "search":
        text = "al buscar, verifique los datos.";
        break;
      case "getData":
        text = "interno al obtener los datos";
        break;
      case "saveData":
        text = "interno al guardar los datos.";
        break;
      case "deleteData":
        text = "interno al eliminar los datos.";
        break;
      case "updateData":
        text = "interno al actualizar los datos.";
        break;
    }
    return Vue.$toast.error("Ocurrió un error " + text, {
      position: "bottom-right",
      timeout: 2381,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  }
  info(message) {
    let text;
    switch (message) {
      case "projectNotFound":
        text = "No se encontró ningún proyecto con ese nombre.";
        break;
    }
    return Vue.$toast.info(text, {
      position: "bottom-right",
      timeout: 2381,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  }
}
export default new Notify();
