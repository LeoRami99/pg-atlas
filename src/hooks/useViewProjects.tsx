import { create } from "zustand";

type Props = {
    viewProjects: boolean;
    setViewProjects: (viewProjects: boolean) => void;
};

export const useViewProjects = create<Props>((set) => ({
    viewProjects: false,
    setViewProjects: (viewProjects: boolean) => set({ viewProjects }),
}));
