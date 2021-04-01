import API from '../api/ApiTypePhase'

class TypePhaseService{
    listAll(){
        return API.get("/consultarTodos")
    }

    edit(id){
        return API.get(`/consultaUnica/${id}`)
    }

    getType(id){
        return API.get(`/tipoProyecto/${id}`)
    }

    getTypeByPhase(id){
        return API.get(`/tipoPhase/${id}`)
    }

    save(obj){
        return API.post('/guardar',obj)
    }

    delete(id){
    	return API.delete(`/eliminar/${id}`)
    }
}

export default new TypePhaseService();