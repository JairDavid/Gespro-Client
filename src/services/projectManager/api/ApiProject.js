import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/proyecto",
    headers:{
        "Content-type": "application/json"
    }
})