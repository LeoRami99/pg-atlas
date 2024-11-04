import axiosInstance from "./config";
import axios from "axios";

import { Filters } from "../types/filters.type";

export const getProjectsFilters = async (filters: Filters) => {
    try {
        const validFilters = Object.entries(filters)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});


        if (Object.keys(validFilters).length === 0) {
            return await axiosInstance.get(`/projects/filter`);

        }
        const response = await axiosInstance.get(`/projects/filter`, {
            params: validFilters,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            throw new Error("Error al obtener los proyectos");
        }
    }
};


export const getListBlockchain = async () => {
    try {
        const response = await axiosInstance.get("/projects/blockchains");
        return response?.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const sendProject = async (data: any) => {
    try {
        const response = await axiosInstance.post("/projects", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};