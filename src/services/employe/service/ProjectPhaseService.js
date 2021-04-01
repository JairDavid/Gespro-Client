import API from '../api/ApiProjectPhase';

class ProjectPhaseService {

	getAll() {
		return API.get("/consultarTodos");
	}

	getById(id) {
		return API.get(`/consultaUnica/${id}`);
	}

    

    searchIdProject(id){
        return API.get(`/tipoProyecto/${id}`)
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

export default new ProjectPhaseService();