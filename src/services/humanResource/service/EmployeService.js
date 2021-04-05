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
    edit(id, obj) {
        return API.put(`/actualizar/${id}`, obj);
    }
    eliminar(id) {
        return API.delete(`/eliminar/${id}`);
    }
    consultaRol() {
        return API.get('/rolEmpleado');
    }
    consultaEmail(email) {
        return API.get(`/correo/${email}`);
    }
    consultaCurp(curp) {
        return API.get(`/consultaCurp/${curp}`);
    }
}

export default new EmployeService();