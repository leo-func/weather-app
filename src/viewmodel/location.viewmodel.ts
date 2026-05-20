import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from "expo-location"
import { router } from "expo-router"
import { useEffect, useState } from "react"

import { History } from "../model/history.model"
import { Location as LocationModel } from "../model/location.model"

import { GetLocation } from "../services/weather.service"
import { useLocationStore } from "../stores/location.store"

export function useLocationViewModel() {

    const { setLocation } = useLocationStore()

    const [search, setSearch] = useState("")
    const [locations, setLocations] = useState<LocationModel[]>([])
    const [history, setHistory] = useState<History[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [geoLoading, setGeoLoading] = useState(false)

    useEffect(() => {
        GetHistory()
    }, [])

    useEffect(() => {
        if (search.trim().length < 2) {
            setLocations([])
            return
        }
        HandleLocations()
    }, [search])

    async function HandleLocations() {
        try {
            setLoading(true)
            setError(null)

            const response = await GetLocation(search)

            setLocations(response || [])
        } catch (e) {
            setError("Erro: " + e)
        } finally {
            setLoading(false)
        }
    }

    async function SaveHistory(location: any) {
        try {
            const response = await AsyncStorage.getItem("History")
            const parsed: History[] = response ? JSON.parse(response) : []

            const exists = parsed.some(
                h =>
                    h.name === location.name &&
                    (h.state || "") === (location.state || "") &&
                    h.country === location.country
            )

            if (exists) return

            parsed.push({
                ...location,
                date: new Date()
            })

            await AsyncStorage.setItem("History", JSON.stringify(parsed))
            setHistory(parsed)
        } catch (e) {
            console.log(e)
        }
    }

    async function GetHistory() {
        //await AsyncStorage.removeItem("History")
        try {
            const response = await AsyncStorage.getItem("History")
            if (!response) return setHistory([])

            setHistory(JSON.parse(response))
        } catch (e) {
            console.log(e)
        }
    }

    async function HandleLocationSelect(location: any) {
        const flag = `https://flagcdn.com/w40/${location.country.toLowerCase()}.png`

        const finalLocation = {
            ...location,
            flag
        }

        setLocation(
            finalLocation.name,
            finalLocation.state || "",
            finalLocation.country,
            finalLocation.lat,
            finalLocation.lon
        )

        await AsyncStorage.setItem(
            "last_location",
            JSON.stringify(finalLocation)
        )

        await SaveHistory(finalLocation)

        router.back()
    }

    async function getGeoLocation() {
        try {
            setGeoLoading(true)

            const { status } =
                await Location.requestForegroundPermissionsAsync()

            if (status !== "granted") {
                setError("Permissão negada")
                return null
            }

            const position =
                await Location.getCurrentPositionAsync({})

            const geo = await Location.reverseGeocodeAsync({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })

            const place = geo[0]

            return {
                name: place?.city || place?.subregion || place?.district || "Minha localização",
                state: place?.region || "",
                country: place?.country || "",
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }

        } catch (e) {
            setError("Erro GPS: " + e)
            return null
        } finally {
            setGeoLoading(false)
        }
    }

    async function onGeoPress() {
        const geo = await getGeoLocation()
        if (!geo) return

        HandleLocationSelect({
            ...geo,
            flag: `https://flagcdn.com/w40/${geo.country.toLowerCase()}.png`
        })
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
        geoLoading,
        HandleLocationSelect,
        goToWeather,
        getGeoLocation,
        onGeoPress
    }
}