import API from '../api/ApiProgress';

class EmployeService {

	getAll() {
		return API.get("/consultarTodos");
	}

	getById(id) {
		return API.get(`/consultaUnica/${id}`);
	}

	save(obj) {
		return API.post('/guardar', obj);
	}

	update(id) {
		return API.put(`/actualizar/${id}`);
	}

	delete(id) {
		return API.delete(`/eliminar/${id}`);
	}

}

export default new EmployeService();