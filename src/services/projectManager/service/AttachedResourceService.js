import ApiAttachedResource from '../api/ApiAttachedResource'

class AttachedResourceService{

    getAll(){
        return ApiAttachedResource.get("/consultarTodos")
    }
    getOne(id){
        return ApiAttachedResource.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return ApiAttachedResource.post('/guardar',obj)
    }

    update(obj){
    	return ApiAttachedResource.put('/actualizar',obj)
    }

    delete(id){
    	return ApiAttachedResource.delete(`/eliminar/${id}`)
    }

}

export default new AttachedResourceService()