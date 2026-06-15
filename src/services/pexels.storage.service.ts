import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCachedPhoto(query: string) {
    const response = await AsyncStorage.getItem("pexels_cache")

    if (!response) return null;

    const cache = JSON.parse(response)

    return cache[query]
}

export async function saveCachedPhoto(query: string, url: string) {
    const response = await AsyncStorage.getItem("pexels_cache")

    const cache = response ? JSON.parse(response) : {};

    cache[query] = url

    await AsyncStorage.setItem("pexels_cache", JSON.stringify(cache))

}
