import axios from 'axios';
export default axios.create({
    baseURL: "http://100.25.145.27:2000/auth",
    headers: {
        "Content-type": "application/json",
    }
});