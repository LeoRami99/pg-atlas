import axiosInstance from "./config";

import { Filters } from "../types/filters.type";

export const getProjectsFilters = async (filters: Filters) => {
    try {
        const validFilters = Object.entries(filters)
            .filter(([_, value]) => value)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});


        if (Object.keys(validFilters).length === 0) {
            return await axiosInstance.get(`/projects/filter`);

        }
        const response = await axiosInstance.get(`/projects/filter`, {
            params: validFilters,
        });
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const getListBlockchain = async () => {
    try {
        const response = await axiosInstance.get("/projects/blockchains");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};