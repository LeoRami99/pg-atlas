import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "https://5v2kv694-3000.use2.devtunnels.ms",
    headers: {
        "Content-Type": "application/json",

    },
});
export default axiosInstance;