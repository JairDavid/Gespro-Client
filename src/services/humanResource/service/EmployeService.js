import axios from 'axios';
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
    consultaEmailAxios(email, token) {
        return axios.get(`http://35.172.158.0:2000/empleado/correo/${email}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new EmployeService();