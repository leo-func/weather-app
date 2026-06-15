import { View } from "react-native";

import { ForecastCard } from "../components/Weather/ForecastCard";
import { InfoCard } from "../components/Weather/InfoCard";
import { WeatherHero } from "../components/Weather/WeatherHero";
import { useWeatherViewModel } from "../viewmodel/weather.viewmodel";

export function WeatherView({
    name,
    state,
    country,
    photo,
    error,
    loading,
    forecast,
    data,
    goToSearch,

} : ReturnType<typeof useWeatherViewModel>) {  

    return (
        <View style={{ flex: 1, backgroundColor: "#020817" }}> 
            <WeatherHero
                name={name}
                state={state}
                country={country}
                photo={photo || undefined}
                temp={data?.main.temp}
                description={data?.weather[0].description}
                icon={data?.weather[0].icon}
                feels_like={data?.main.feels_like}
                temp_max={data?.main.temp_max}
                temp_min={data?.main.temp_min}
                loading={loading}
                onLocationSelect={goToSearch}
            />
             
            <ForecastCard forecast={forecast} loading={loading}></ForecastCard>
            
            <InfoCard
                speed={data?.wind.speed} 
                humidity={data?.main.humidity}
                feels_like={data?.main.feels_like}
                loading={loading}
                >
             </InfoCard>

        </View>
    )
}