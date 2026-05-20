import { WeatherView } from "@/src/view/WeatherView";
import { useWeatherViewModel } from "@/src/viewmodel/weather.viewmodel";

export default function Index() {
  const WeatherViewModel = useWeatherViewModel()
  
  return (
    <WeatherView {...WeatherViewModel}/>
  );
}
