import ApiAttachedResource from '../api/ApiAttachedResource'

class AttachedResourceService{

    getAll(){
        return ApiAttachedResource.get("/consultarTodos")
    }
    getOne(id){
        return ApiAttachedResource.get(`/consultaUnica/${id}`)
    }

    getOneAdscritoProjects(id){
        return ApiAttachedResource.get(`/consultaIdEmpleado/${id}`)
    }

    save(obj){
        return ApiAttachedResource.post('/guardar',obj)
    }

    update(id, obj){
    	return ApiAttachedResource.put(`/actualizar/${id}`, obj)
    }

    delete(id){
    	return ApiAttachedResource.delete(`/eliminar/${id}`)
    }

}

export default new AttachedResourceService()