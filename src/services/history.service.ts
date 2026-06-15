import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location } from "../model/location.model";

export async function saveHistory(location: Location) {
    const response = await AsyncStorage.getItem("History")
    const parsed: Location[] = response ? JSON.parse(response) : []

    // Remove a localização caso ela ja exista no histórico, 
    // adicionando ela novamente no topo da lista como mais recente
    const filtered = parsed.filter(
        h => ! (
                    h.name === location.name &&
                    (h.state || "") === (location.state || "") &&
                    h.country === location.country
                ) 
    )

    filtered.unshift(location)
    
    await AsyncStorage.setItem("History", JSON.stringify(filtered))
}

export async function getHistory() : Promise<Location[]> {
    const response = await AsyncStorage.getItem("History")
    const data : Location[] = response ? JSON.parse(response) : []
    return data
}

export async function deleteHistory() {
    await AsyncStorage.removeItem("History")
}