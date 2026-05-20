
export async function Get(lat: number, lon: number) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}&units=metric&lang=pt_br`
    )

    return await response.json()

}



export async function GetForecast(lat: number, lon: number) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}&units=metric&lang=pt_br`
    )

    return await response.json()

}



export async function GetLocation(search: string) {

    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${process.env.EXPO_PUBLIC_API_KEY}`
    )

    return await response.json()

}