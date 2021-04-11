import axios from 'axios';
const newAxios = axios.create({
    baseURL: "http://52.72.71.229:2000/rol",
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