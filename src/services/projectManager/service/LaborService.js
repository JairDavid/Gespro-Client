import ApiLabor from '../api/ApiLabor'

class LaborService{
    getAll(){
        return ApiLabor.get("/consultarTodos")
    }
    getOne(id){
        return ApiLabor.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return ApiLabor.post('/guardar',obj)
    }

    update(obj){
    	return ApiLabor.put('/actualizar',obj)
    }

    delete(id){
    	return ApiLabor.delete(`/eliminar/${id}`)
    }
}

export default new LaborService()