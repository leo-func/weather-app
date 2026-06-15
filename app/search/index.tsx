import { LocationView } from "@/src/view/LocationView";
import { useLocationViewModel } from "@/src/viewmodel/location.viewmodel";

export default function Search() {
    const model = useLocationViewModel()


    return (
        <LocationView {... model}/>
    )
}