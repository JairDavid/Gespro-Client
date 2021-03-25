import API from '../api/ApiPhase'

class PhaseService{
    listAll(){
        return API.get("/consultarTodos")
    }
    edit(id){
        return API.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return API.post('/guardar',obj)
    }

    update(obj, id){
    	return API.put(`/actualizar/${id}`,obj)
    }

    delete(id){
    	return API.delete(`/eliminar/${id}`)
    }
}

export default new PhaseService();