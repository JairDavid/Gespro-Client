import API from '../api/ApiProgress';

class ProgressService {

	getAll() {
		return API.get("/consultarTodos");
	}

	getById(id) {
		return API.get(`/consultaUnica/${id}`);
	}

	listAllTrue() {
		return API.get("/consultarTerminados");
	}

	finish(idproyecto, idasignacion){
		return API.get(`/terminado/${idproyecto}/${idasignacion}`)
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

export default new ProgressService();