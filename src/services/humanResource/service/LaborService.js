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
    getName(name){
        return API.get(`/consultaPorNombre/${name}`);
    }
}
export default new LaborService();