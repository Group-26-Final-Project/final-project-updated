import axios from 'axios'
import { getData } from './RetrieveToken';

const CustomAxios = axios.create({
    baseURL: 'https://7add-197-156-103-216.eu.ngrok.io',
});

// CustomAxios.interceptors.request.use(
//     req => {
//         getData()
//             .then((token) => {
//                 console.log("Token", token)
//                 req.headers['Authorization'] = 'Bearer ' + token
//             })
//         return req;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// )

// CustomAxios.interceptors.response.use(
//     res=>{
//         return res;
//     },
//     err=>{
//         const status = err.response ? err.response.status : null
//         if (status === 401){
//             console.log("Unauthorized")
//             localStorage.removeItem('token')
//             window.location.replace('/')
//         }
//         return Promise.resolve(err);
//     }
// )

export default CustomAxios