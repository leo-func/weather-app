import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location } from "../model/location.model";

export async function saveLastLocation(location: Location) {
    await AsyncStorage.setItem("last_location", JSON.stringify(location))
}

export async function getLastLocation() : Promise<Location | null> {
    const response = await AsyncStorage.getItem("last_location")

    return response ? JSON.parse(response) : null
}
