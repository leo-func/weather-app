import { useState } from "react"
import { getCurrentLocation } from "../services/geolocation.service"

export function useGeoLocation() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function getLocation() {
        try {
            setLoading(true)
            setError(null)

            return await getCurrentLocation()

        } catch (err: any) {
            setError(err.message ?? "Erro ao obter localização")
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        getLocation,
        loading,
        error
    }
}