import axios from 'axios';
const newAxios = axios.create({
    baseURL: "http://localhost:8080/tipo",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
});

newAxios.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem('accessToken')
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return error
})

newAxios.interceptors.response.use(res => {
    return res
})
export default newAxios;