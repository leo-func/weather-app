import { router } from "expo-router"
import { useEffect, useState } from "react"

import { Forecast } from "../model/forecast.model"
import { Weather } from "../model/weather.model"

import { Get, GetForecast } from "../services/weather.service"

import { useLocationStore } from "../stores/location.store"

import { getPhoto } from "../services/pexels.service"
import { mapWeatherToQuery } from "../utils/mapWeatherToQuery"

import AsyncStorage from "@react-native-async-storage/async-storage"


export function useWeatherViewModel() {

    const { name, country, state, lat, lon } = useLocationStore()

    const [data, setData] = useState<Weather | null>(null)

    const [photo, setPhoto] = useState<string | null>(null)

    const [forecast, setForecast] = useState<Forecast | null>(null)

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)



    useEffect(() => {

        if (!lat || !lon) return

        GetWeather(lat, lon)

    }, [lat, lon])



    useEffect(() => {

        if (!lat || !lon) return

        HandleForecast(lat, lon)

    }, [lat, lon])

    useEffect(() => {
        (async () => {
            const data = await AsyncStorage.getItem("last_location")

            if (!data) return

            const last = JSON.parse(data)

            useLocationStore.getState().setLocation(
                last.name,
                last.state || "",
                last.country,
                last.lat,
                last.lon
            )
        })()
    }, [])


    async function GetWeather(lat: number, lon: number) {

        try {

            setLoading(true)
            setData(null)
            setError(null)

            const response = await Get(lat, lon)

            if (response.cod === "404") {
                setError("Não foi possível encontrar essa localização.")
                return
            }

            setData(response)

            const desc = response.weather?.[0]?.description ?? "clear sky"

            await HandlePhoto(desc)

        } catch (exception) {
            setError("Ocorreu um erro: " + exception)
        } finally {
            setLoading(false)
        }
    }



    async function HandleForecast(lat: number, lon: number) {

        try {

            setLoading(true)

            setError(null)

            const response = await GetForecast(lat, lon)

            if (response.cod === "404") {

                setError("Não foi possível encontrar a previsão.")

                return

            }

            setForecast(response)

        } catch (exception) {

            setError("Ocorreu um erro: " + exception)

        } finally {

            setLoading(false)

        }

    }

    async function HandlePhoto(description: string) {
        try {

            const query = mapWeatherToQuery(description)

            const response = await getPhoto(query)

            const imageUrl = response.photos?.[0]?.src?.large

            if (!imageUrl) {
                setPhoto("https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg")
                return
            }

            setPhoto(imageUrl)

        } catch (error) {
            console.log("Erro foto:", error)

            setPhoto("https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg")
        }
    }



    function goToSearch() {

        router.push("/search")

    }



    return {

        name,
        state,
        country,

        data,
        forecast,
        photo,

        error,
        loading,

        goToSearch

    }

}