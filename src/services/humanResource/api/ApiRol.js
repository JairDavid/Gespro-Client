import axios from 'axios';
export default axios.create({
    baseURL: "http://localhost:8080/rol",
    headers: {
        "Content-type":"application/json"
    }
});