import * as ExpoLocation from "expo-location";
import { Location } from "../model/location.model";

export async function getCurrentLocation() : Promise<Location> {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync()

    if (status !== "granted") {
        throw new Error("Permissão de localização negada");
    }

    const position = await ExpoLocation.getCurrentPositionAsync({})

    const geo = await ExpoLocation.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })

    const place = geo[0]
    const country = place?.isoCountryCode || ""
    const flag = `https://flagcdn.com/w40/${country.toLowerCase()}.png`

    return {
        name: place?.city || place?.subregion || "Minha localização",
        state: place?.region || "",
        country,
        flag,
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

}