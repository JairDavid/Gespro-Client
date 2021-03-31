import ApiDeliverableAssigment from '../api/ApiDeliverableAssigment'

class DeliverableAssigmentService{
    getAll(){
        return ApiDeliverableAssigment.get("/consultarTodos")
    }
    getOne(id){
        return ApiDeliverableAssigment.get(`/consultaUnica/${id}`)
    }

    searchDeliverable(id){
        return ApiDeliverableAssigment.get(`/faseProyecto/${id}`)
    }

    getAllDeliverableAssigment(id){
        return ApiDeliverableAssigment.get(`/faseProyectos/${id}`)
    }

    save(obj){
        return ApiDeliverableAssigment.post('/guardar',obj)
    }

    update(obj){
    	return ApiDeliverableAssigment.put('/actualizar',obj)
    }

    delete(id){
    	return ApiDeliverableAssigment.delete(`/eliminar/${id}`)
    }
}

export default new DeliverableAssigmentService()