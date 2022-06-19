import axios from "axios"

// const baseURL = "https://e909-197-156-118-253.eu.ngrok.io"
const baseURL = "http://localhost:8080"

export const getToken = () => {
    return (
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
    )
}

const instance = axios.create({
    baseURL: baseURL
});

export default instance;