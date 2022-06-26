import axios from 'axios'

const CustomAxios = axios.create({
    // baseURL: 'https://7add-197-156-103-216.eu.ngrok.io'
    baseURL: 'http://localhost:8080'
});

CustomAxios.interceptors.request.use(
    req=>{
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : "" 
        req.headers['Authorization'] = 'Bearer ' + token
        return req;
    },
    err=>{
        return Promise.reject(err);
    }
)

CustomAxios.interceptors.response.use(
    res=>res,
    err=>{
        const status = err.response ? err.response.status : null
        if (status === 401){
            console.log("Unauthorized")
            localStorage.removeItem('token')
            window.location.replace('/')
        }
        return Promise.reject(err);
    }
)

export default CustomAxios