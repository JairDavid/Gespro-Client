import API from '../api/ApiLabor';

class LaborService {
    getAll() {
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
        return API.delete(`/eliminar/${id}`)
    }
}
export default new LaborService();