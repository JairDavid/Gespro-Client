import API from '../api/ApiType'

class ControllerService{
    listAll(){
        return API.get("/consultarTodos")
    }
    edit(id){
        return API.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return API.post('/guardar',obj)
    }

    update(id,obj){
    	return API.put(`/actualizar/${id}`,obj)
    }

    delete(id){
    	return API.delete(`/eliminar/${id}`)
    }
}

export default new ControllerService();