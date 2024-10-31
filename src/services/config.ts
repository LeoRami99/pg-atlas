import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://pg-atlas-back-production.up.railway.app/",
    headers: {
        "Content-Type": "application/json",

    },
});
export default axiosInstance;