export interface Weather {
    main: {
        temp: number
        temp_min: number
        temp_max: number
        feels_like: number
        humidity: number
        uvi: number
    }

    wind: {
        speed: number
    }

    weather: {
        description: string,
        icon: string
    }[]
}