import API from './ApiProject'

class CoordinatorService {
    listAll() {
        return API.get("consultarTodos")
    }
    getOne(id) {
        return API.get(`/consultaUnica/${id}`)
    }

    searchByName(value) {
        return API.get(`/consultaPorNombre/${value}`)
    }

    save(obj) {
        return API.post('/guardar', obj)
    }

    update(id, obj) {
        return API.put(`/actualizar/${id}`, obj)
    }

    delete(id) {
        return API.delete(`/eliminar/${id}`)
    }
}

export default new CoordinatorService();