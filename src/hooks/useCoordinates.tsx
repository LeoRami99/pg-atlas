import { create } from 'zustand';

interface useCoordinatesState {
    latitude: number | null;
    longitude: number | null;
    setCoordinates: (lat: number, lng: number) => void;
}

const useCoordinates = create<useCoordinatesState>((set) => ({
    latitude: null,
    longitude: null,
    setCoordinates: (lat, lng) => set({ latitude: lat, longitude: lng }),
}));

export default useCoordinates;
