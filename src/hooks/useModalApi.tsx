import { create } from "zustand";

type Props = {
    viewApi: boolean;
    setViewApi: (viewApi: boolean) => void;
};

export const useViewApi = create<Props>((set) => ({
    viewApi: false,
    setViewApi: (viewApi: boolean) => set({ viewApi }),
}));
