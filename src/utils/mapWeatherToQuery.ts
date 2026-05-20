export const mapWeatherToQuery = (desc: string) => {
    const d = desc.toLowerCase()

    if (d.includes("chuva")) return "rain"
    if (d.includes("céu")) return "sky"
    if (d.includes("nublado")) return "overcast sky"
    if (d.includes("ensoralado")) return "sunny"
    if (d.includes("nuvens")) return "cloudy"
    if (d.includes("tempestade")) return "thunderstorm"
    if (d.includes("garoa")) return "drizzle"
    return "nature sky"
}