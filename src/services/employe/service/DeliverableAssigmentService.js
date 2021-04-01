import API from '../api/ApiDeliverableAssigment';

class DeliverableAssigmentService {

	getAll() {
		return API.get("/consultarTodos");
	}

	getById(id) {
		return API.get(`/consultaUnica/${id}`);
	}

	save(obj) {
		return API.post('/guardar', obj);
	}

    searchDeliverable(id){
        return API.get(`/faseProyecto/${id}`)
    }
	
	update(id) {
		return API.put(`/actualizar/${id}`);
	}

	delete(id) {
		return API.delete(`/eliminar/${id}`);
	}

}

export default new DeliverableAssigmentService();