
import { create } from "zustand";
import { LocationStore } from "../model/locationStore.model";

export const useLocationStore = create<LocationStore>((set) => ({

    name: "",
    state: "",
    country: "",

    lat: 0,
    lon: 0,

    setLocation: (name: string, state: string, country: string, lat: number, lon: number) =>

        set({
            name,
            state,
            country,
            lat,
            lon
        })

}))