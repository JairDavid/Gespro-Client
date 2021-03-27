import ApiProgress from '../api/ApiProgress'

class ProgressService{
    getAll(){
        return ApiProgress.get("/consultarTodos")
    }
    getOne(id){
        return ApiProgress.get(`/consultaUnica/${id}`)
    }

    searchIdProject(id){
        return ApiProgress.get(`/buscarProyecto/${id}`)
    }

    save(obj){
        return ApiProgress.post('/guardar',obj)
    }

    update(obj){
    	return ApiProgress.put('/actualizar',obj)
    }

    delete(id){
    	return ApiProgress.delete(`/eliminar/${id}`)
    }
}

export default new ProgressService()