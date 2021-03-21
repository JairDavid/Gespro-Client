import ApiProject from '../api/ApiProject'

class ProjectService{
    getAll(){
        return ApiProject.get("/consultarTodos")
    }
    getOne(id){
        return ApiProject.get(`/consultaUnica/${id}`)
    }

    save(obj){
        return ApiProject.post('/guardar',obj)
    }

    update(obj){
    	return ApiProject.put('/actualizar',obj)
    }

    delete(id){
    	return ApiProject.delete(`/eliminar/${id}`)
    }

}

export default new ProjectService()