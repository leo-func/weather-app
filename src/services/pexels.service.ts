import { Pexels } from "../model/photo.model"

export async function getPhoto(query: string) {
    const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
        {
            headers: {
                Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY!
            }
        }
      )           


    const data : Pexels = await response.json()

    return data.photos?.[0]?.src.large ?? null          
}