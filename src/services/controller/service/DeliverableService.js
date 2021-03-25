import API from '../api/ApiDeliverable'

class DeliverableService{
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

    dowload(id){
        return API.get(`/descargar/${id}`)
    }

    updateName(id, name){
        return API.put(`/actualizarnombre/${id}`, name)
    }
}

export default new DeliverableService();