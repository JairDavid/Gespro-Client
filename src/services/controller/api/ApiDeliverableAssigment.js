import axios from 'axios';
const token = localStorage.getItem("accessToken");
export default axios.create({
    baseURL: "http://localhost:8080/asignarEntregable",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}`
    }
});