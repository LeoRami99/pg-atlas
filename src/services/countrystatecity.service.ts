import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.countrystatecity.in/v1/',
    headers: {
        'X-CSCAPI-KEY': import.meta.env.API_KEY_COUNTRYS_API as string
    }
});
console.log(import.meta.env.VITE_API_KEY_COUNTRYS_API);


export const getCountries = async () => {
    try {
        const response = await axiosInstance.get('countries');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const getCities = async (ciso: string) => {
    try {
        const response = await axiosInstance.get(`countries/${ciso}/cities`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}