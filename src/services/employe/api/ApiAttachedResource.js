import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8080/adscrito",
    headers:{
        "Content-type": "application/json"
    }
})