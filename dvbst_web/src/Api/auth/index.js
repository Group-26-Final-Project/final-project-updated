import axios from "../axiosConfig"

// export const login = async (email, password) => {
//     try {
//         console.log("login called")
//         const { data: result } = await axios.post("/login", { email, password })
        
//         if (result.auth) {
//             localStorage.setItem("token", result.token)
//         }
//         return result;
//     } catch (error) {
//         console.log(error)
//         console.log("this for error display checkup")
//         throw new Error("Invalid Email or Password")
//     }
// }

export const loginWithMagicLink = async (email, link) => {
    try {
        console.log("login called")
        const { data: result } = await axios.post("/login/enter", { email, link })

        console.log("result--", result);
        
        if (result.data) {
            localStorage.setItem("token", result.data)
        }
        return result;
    } catch (error) {
        console.log(error)
        console.log("this for error display checkup")
        throw new Error("Invalid Email or Password")
    }
}

export const verifyWithMagicLink = async (email, link) => {
    try {
        console.log("verify called")
        const { data: result } = await axios.post("/verify", { email, link })

        console.log("result--", result);
        return result;
    } catch (error) {
        // console.log(error)
        // console.log("this for error display checkup")
        throw new Error("Invalid Email or Password")
    }
}

export const logout = () => {
    localStorage.removeItem("token")
}