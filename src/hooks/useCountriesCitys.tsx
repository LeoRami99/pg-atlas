import { create } from 'zustand';
import { countryType, cityType } from "../types/countriescitys.type";

interface useCountriesCitysState {
    countries: countryType[];
    cities: cityType[];
    setCountries: (countries: countryType[]) => void;
    setCities: (cities: cityType[]) => void;
}

const useCountriesCitys = create<useCountriesCitysState>((set) => ({
    countries: [],
    cities: [],
    setCountries: (countries) => set({ countries }),
    setCities: (cities) => set({ cities }),
}));


export default useCountriesCitys;