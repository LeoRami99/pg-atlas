import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.countrystatecity.in/v1/',
    headers: {
        'X-CSCAPI-KEY': "UVZycXJ3WXhXTmV4MzllVnZlY0s5Y0g5V21yMGN6SEloZUNaamJsdQ=="
    }
});



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