import * as Location from "expo-location"

export async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== "granted") {
        throw new Error("Permissão de localização negada")
    }

    const position = await Location.getCurrentPositionAsync({})

    return {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
}