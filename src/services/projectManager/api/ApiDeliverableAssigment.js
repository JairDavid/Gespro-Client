import axios from 'axios'

export default axios.create({
    baseURL: "http://10.0.0.11:8080/asignarEntregable",
    headers:{
        "Content-type": "application/json"
    }
})