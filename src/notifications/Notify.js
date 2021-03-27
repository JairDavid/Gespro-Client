import Vue from 'vue'
import "vue-toastification/dist/index.css";
class Notify {
    fillFields(message) {
        let text = '';
        console.log(text)
        switch (message) {
            case 'searchInput':
                text = 'Debes ingresar el nombre del proyecto.'
                break;
            case 'form':
                text = 'Todos los campos son obligatorios; Excepto descripción.'
                break;
            case 'forceToSearch':
                text = 'Primero debes buscar un proyecto.'
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
            case 'phase':
                text = 'Fase agregada'
                break;
            case 'deleteProject':
                text = 'Proyecto eliminado'
                break;
            case 'updateProject':
                text = 'Proyecto actualizado'
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
            case 'add':
                text = 'al agregar, verifique los datos.'
                break;
            case 'anotherAdd':
                text = 'este empleado ya se encuentra registrado en el proyecto'
                break;    
            case 'delete':
                text = 'al borrar, verifique los datos.'
                break;
            case 'update':
                text = 'al actualizar, verifique los datos.'
                break;
            case 'search':
                text = 'al buscar, verifique los datos.'
                break;
            case 'getData':
                text = 'interno al obtener los datos'
                break;
            case 'saveData':
                text = 'interno al guardar los datos.'
                break;
            case 'deleteData':
                text = 'interno al eliminar los datos.'
                break;
            case 'updateData':
                text = 'interno al actualizar los datos.'
                break;
        }
        return Vue.$toast.error('Ocurrió un error ' + text, {
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
    info(message) {
        let text;
        switch (message) {
            case 'projectNotFound':
                text = 'No se encontró ningún proyecto con ese nombre.'
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
        })
    }
}
export default new Notify();