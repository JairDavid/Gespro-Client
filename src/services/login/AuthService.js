import API from "./ApiAuth";
class AuthService {
    getSession(obj) {
        return API.post("/authenticate", obj);
    }
}
export default new AuthService();