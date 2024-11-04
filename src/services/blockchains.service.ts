import axios from "axios";
import { blockchainListType } from "../types/blockchainList.types";

const CACHE_KEY = "blockchains";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hora en milisegundos

export const listOfBlockchains = async (): Promise<blockchainListType[]> => {
    // Revisa si los datos están en localStorage y no han expirado
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

    if (cachedData && cachedTimestamp) {
        const expirationTime = parseInt(cachedTimestamp, 10) + CACHE_EXPIRATION;
        if (Date.now() < expirationTime) {
            return JSON.parse(cachedData) as blockchainListType[];
        }
    }

    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/asset_platforms");
        const data = response.data as blockchainListType[];

        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
