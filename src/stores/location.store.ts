
import { create } from "zustand";
import { Location } from "../model/location.model";
import { LocationStore } from "../model/locationStore.model";

export const useLocationStore = create<LocationStore>((set) => ({

    name: "",
    state: "",
    country: "",
    flag: "",

    lat: 0,
    lon: 0,
    updatedAt: 0,

    setLocation: (location : Location) => set({...location, updatedAt: Date.now()})

}))