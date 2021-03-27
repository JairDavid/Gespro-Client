import ApiEmplooyes from '../api/ApiEmplooyes'

class EmplooyesService{
    getAll(){
        return ApiEmplooyes.get("/consultarTodos")
    }
    getOne(id){
        return ApiEmplooyes.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return ApiEmplooyes.post('/guardar',obj)
    }

    update(obj){
    	return ApiEmplooyes.put('/actualizar',obj)
    }

    delete(id){
    	return ApiEmplooyes.delete(`/eliminar/${id}`)
    }
}

export default new EmplooyesService()