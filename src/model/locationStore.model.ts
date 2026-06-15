import { Location } from "./location.model"

export interface LocationStore extends Location {
    updatedAt: number
    setLocation: (location: Location) => void
}