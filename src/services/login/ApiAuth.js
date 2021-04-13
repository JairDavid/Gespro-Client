import axios from 'axios';
export default axios.create({
    baseURL: "http://35.172.158.0:2000/auth",
    headers: {
        "Content-type": "application/json",
    }
});