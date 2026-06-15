import { router } from "expo-router"
import { useEffect, useState } from "react"

import { Forecast } from "../model/forecast.model"
import { Weather } from "../model/weather.model"

import { Get, GetForecast } from "../services/weather.service"

import { useLocationStore } from "../stores/location.store"

import { getPhoto } from "../services/pexels.service"
import { getCachedPhoto, saveCachedPhoto } from "../services/pexels.storage.service"
import { getLastLocation } from "../services/weather.storage.service"
import { mapWeatherToQuery } from "../utils/mapWeatherToQuery"



export function useWeatherViewModel() {

    const { name, country, state, lat, lon, setLocation, updatedAt } = useLocationStore()

    const [data, setData] = useState<Weather | null>(null)

    const [photo, setPhoto] = useState<string | null>(null)

    const [forecast, setForecast] = useState<Forecast | null>(null)

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)


    useEffect(() => {
    
        async function LoadLastLocation() {
            const response = await getLastLocation()
            
            if (!response) {
                return
            }

            setLocation(response)
        }

        LoadLastLocation()

    }, [])


    useEffect(() => {
    
        if (!lat || !lon) return

        HandleWeather(lat, lon)
        
    }, [lat, lon, updatedAt])



    useEffect(() => {

        if (!lat || !lon) return

        HandleForecast(lat, lon)

    }, [lat, lon])



    async function HandleWeather(lat: number, lon: number) {

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
        const FALLBACK_IMAGE = "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg"
        try {
            const query = mapWeatherToQuery(description)

            const cachedPhoto = await getCachedPhoto(query)

            console.log(cachedPhoto)

            if (cachedPhoto) {
                setPhoto(cachedPhoto) 
                return
            }

            console.log("Salvando imagem...")


            const response = await getPhoto(query)
            setPhoto(response ?? FALLBACK_IMAGE)
            
            if (response) await saveCachedPhoto(query, response);

        } catch (error) {
            console.log("Erro foto:", error)

            setPhoto(FALLBACK_IMAGE)
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