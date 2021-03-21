import ApiDeliverable from '../api/ApiDeliverable'

class DeliverableService{
    getAll(){
        return ApiDeliverable.get("/consultarTodos")
    }
    getOne(id){
        return ApiDeliverable.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return ApiDeliverable.post('/guardar',obj)
    }

    update(obj){
    	return ApiDeliverable.put('/actualizar',obj)
    }

    delete(id){
    	return ApiDeliverable.delete(`/eliminar/${id}`)
    }

}

export default new DeliverableService()