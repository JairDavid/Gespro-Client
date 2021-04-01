import API from "../api/ApiDeliverableAssigment"
class DeliverableAssigmentService {
    save(obj) {
        return API.post('/guardar', obj)
    }
}
export default new DeliverableAssigmentService();