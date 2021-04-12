import axios from 'axios';
export default axios.create({
    baseURL: "http://100.25.169.211:2000/auth",
    headers: {
        "Content-type": "application/json",
    }
});