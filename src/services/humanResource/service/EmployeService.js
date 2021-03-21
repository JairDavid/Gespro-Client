import API from '../api/ApiEmploye';

class EmployeService {
    listAll() {
        return API.get('/consultarTodos');
    }
    getOne(id) {
        return API.get(`/consultaUnica/${id}`);
    }
    create(obj) {
        return API.post('/guardar', obj);
    }
    edit(id) {
        return API.put(`/actualizar/${id}`);
    }
    eliminar(id) {
        return API.delete(`/eliminar/${id}`);
    }
    consultaRol() {
        return API.get('/rolEmpleado');
    }
    cosultaEmail(email) {
        return API.get(`/correo/${email}`)
    }
}

export default new EmployeService();