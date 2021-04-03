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
    edit(id, obj) {
        return API.put(`/actualizar/${id}`,obj);
    }
    eliminar(id) {
        return API.delete(`/eliminar/${id}`)
    }
    getOneName(value){
        return API.get(`/consultaNombre/${value}`);
    }
}
export default new LaborService();