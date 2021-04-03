import ApiRol from '../api/ApiRol';

class RolService{
    getAll(){
        return ApiRol.get("/consultarTodos");
    }
    getOne(id){
        return ApiRol.get(`/consultaUnica/${id}`);
    }
}
export default new RolService();