import { router } from "expo-router"
import { useState } from "react"
import { Location } from "../model/location.model"
import { getCurrentLocation } from "../services/geolocation.service"
import { saveHistory } from "../services/history.service"
import { useLocationStore } from "../stores/location.store"

export function useGeoLocation() {
    const { setLocation } = useLocationStore()
    const [geoLoading, setLoading] = useState(false)
    const [geoError, setError] = useState<string | null>(null)

    async function getLocation() {
        try {
            setLoading(true)
            setError(null)

            
            const timeoutPromise: Promise<never> = new Promise<never>((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Não conseguimos localizar você no momento."))
                }, 8000)
            })

            const location = await Promise.race<Location>([
                getCurrentLocation(),
                timeoutPromise
            ])
            
            setLocation(location)
            
            await saveHistory(location)
            router.back()

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message ?? "Erro ao obter localização")
                return null
            }
        } finally {
            setLoading(false)
        }
    }

    function clearGeoError() {
        setError(null)
    }

    return {
        getLocation,
        geoLoading,
        geoError,
        clearGeoError
    }
}

