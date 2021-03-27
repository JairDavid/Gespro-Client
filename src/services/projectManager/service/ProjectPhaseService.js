import ApiProjectPhase from '../api/ApiProjectPhase'

class ProyectPhase{
    getAll(){
        return ApiProjectPhase.get("/consultarTodos")
    }
    getOne(id){
        return ApiProjectPhase.get(`/consultaUnica/${id}`)
    }

    searchIdProject(id){
        return ApiProjectPhase.get(`/tipoProyecto/${id}`)
    }

    save(obj){
        return ApiProjectPhase.post('/guardar',obj)
    }

    update(obj){
    	return ApiProjectPhase.put('/actualizar',obj)
    }

    delete(id){
    	return ApiProjectPhase.delete(`/eliminar/${id}`)
    }
}

export default new ProyectPhase()