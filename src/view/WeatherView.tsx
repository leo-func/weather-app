import { View } from "react-native";

import { ForecastCard } from "../components/ForecastCard";
import { InfoCard } from "../components/InfoCard";
import { WeatherHero } from "../components/WeatherHero";
import { FooterMenu } from "../components/footerMenu";
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
        <View style={{ flex: 1 }}> 
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
                onLocationSelect={goToSearch}
            />
            
            <InfoCard
                speed={data?.wind.speed} 
                humidity={data?.main.humidity}
                feels_like={data?.main.feels_like}>
            

             </InfoCard>
             
            <ForecastCard forecast={forecast}></ForecastCard>

            
            <FooterMenu></FooterMenu>

        </View>
    )
}