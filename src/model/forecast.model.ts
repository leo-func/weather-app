export interface Forecast {
    list: {
        main: {
            temp: number
            temp_min: number
            temp_max: number
            feels_like: number
            humidity: number
        }

        wind: {
            speed: number
        }

        weather: {
            description: string
            icon: string
        }[]

        dt_txt: string
    } []
}