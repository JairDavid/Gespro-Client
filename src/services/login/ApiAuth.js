import axios from 'axios';
export default axios.create({
    baseURL: "http://52.72.71.229:2000/auth",
    headers: {
        "Content-type": "application/json",
    }
});