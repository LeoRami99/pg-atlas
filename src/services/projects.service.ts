import axiosInstance from "./config";

import { Filters } from "../types/filters.type";

export const getProjectsFilters = async (filters: Filters) => {

    try {
        const response = await axiosInstance.get(`/project/filters?blockchain=${filters.blockchain}&activityStatus=${filters.activityStatus}&country=${filters.country}&city=${filters.city}`);
        return response;
    } catch (error) {
        throw error;
    }
};


export const getListBlockchain = async () => {
    try {
        const response = await axiosInstance.get("/project/blockchains");
        return response.data;
    } catch (error) {
        throw error;
    }
};