import { router } from "expo-router"
import { useEffect, useState } from "react"

import { Location } from "../model/location.model"

import { useDebounce } from "../hooks/useDebounce"
import { useGeoLocation } from "../hooks/useLiveLocation"
import { deleteHistory, getHistory, saveHistory } from "../services/history.service"
import { GetLocation } from "../services/weather.service"
import { saveLastLocation } from "../services/weather.storage.service"
import { useLocationStore } from "../stores/location.store"

export function useLocationViewModel() {
    const { getLocation, geoLoading, geoError, clearGeoError } = useGeoLocation()
    const { setLocation } = useLocationStore()

    const [search, setSearch] = useState("")
    const [locations, setLocations] = useState<Location[]>([])
    const [history, setHistory] = useState<Location[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const debouncedSearch = useDebounce(search)

    useEffect(() => {
        async function LoadHistory() {
            const history = await getHistory()
            setHistory(history)
        }

        LoadHistory()
    }, [history])

    useEffect(() => {
        if (debouncedSearch.trim().length < 2) {
            setLocations([])
            return
        }

        HandleLocations()
    }, [debouncedSearch])

    async function HandleLocations() {
        try {
            setLoading(true)
            setError(null)

            const response = await GetLocation(debouncedSearch)

            setLocations(response || [])
        } catch (e) {
            setError("Erro: " + e)
        } finally {
            setLoading(false)
        }
    }

    async function HandleLocationSelect(location: Location) {
        try {
            setLocation(location)

            await saveLastLocation(location)
            await saveHistory(location)

            goToWeather()
        } catch (e) {
            console.log("Ocorreu um erro: " + e)
        }
    }

    async function HandleClearHistory() {
        await deleteHistory()
    }

    async function HandleGeoLocation() {
        await getLocation()
    }

    function goToWeather() {
        router.back()
    }

    return {
        locations,
        history,
        search,
        setSearch,
        loading,
        error,
        HandleLocationSelect,
        goToWeather,
        HandleGeoLocation,
        HandleClearHistory,
        geoLoading,
        geoError,
        clearGeoError
    }
}