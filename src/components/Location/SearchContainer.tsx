import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"


import {
    ChevronRight,
    MapPin,
    Search
} from "lucide-react-native"


import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Location } from "../../model/location.model"

type SearchProps = {
    locations: Location[]
    loading: boolean
    search: string
    setSearch: (value: string) => void
    HandleLocationSelect: (location : Location) => Promise<void>
    HandleGeoLocation: () => Promise<void>
    geoLoading: boolean
    geoError: string | null

}

export function SearchContainer({
    locations,
    loading,
    search,
    setSearch,
    HandleLocationSelect,
    HandleGeoLocation,
    geoLoading,
    geoError
} : SearchProps) {

    return (
        <View> 

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={21} color="#94a3b880" />

                    <TextInput
                        placeholder="Buscar cidade..."
                        placeholderTextColor="#94a3b880"
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>

                <TouchableOpacity
                    style={styles.geoButton}
                    onPress={HandleGeoLocation}
                >
                    {geoLoading ? (
                        <View style={{alignItems: "center"}}>
                            <ActivityIndicator size="large" color={"#fff"}/>
                        </View>
                    ): (
                        <View style={{flexDirection: "row"}}>
                            <MapPin size={21} color="#2563EB" />
                            <Text style={styles.geoText}>
                                Usar minha localização
                            </Text>
                            <ChevronRight color={"#28313d96"}/>
                        </View>
                    )}
                </TouchableOpacity>
                
                {search.trim().length > 2 &&
                
                    <View style={styles.resultContainer}>
                        {
                        
                            loading ? (
                                <ActivityIndicator size="large" color="#fff"/>
                            ) : (
                                <FlatList
                                    data={locations}
                                    keyExtractor={(item) =>`${item.lat}-${item.lon}`}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator}/>
                                    )}
                                    
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={styles.resultButton} onPress={() => HandleLocationSelect(item)}>                                
                                            <View style={styles.leftContent}>
                                                <Image source={{uri: item.flag}} style={styles.flag}/>

                                                <View>
                                                    <Text style={styles.city}>{item.name}</Text>
                                                    
                                                    {
                                                        item.state ? (
                                                            <Text style={styles.country}>{item.state}, {item.country} </Text>
                                                        ) : (
                                                            <Text style={styles.country}>{item.country} </Text>
                                                        )
                                                    }
                                                </View>

                                            </View>

                                            <ChevronRight size={24} color={"#28313d96"}/>
                                        </TouchableOpacity>
                                    )}

                                />
                            )
                            
                        }
                    </View>
                }
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: "#0d1520",
        borderColor: "#28313d96", 
        borderWidth: 1, 
        borderRadius: hp(8), 
        padding: 6
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    headerTitle: {
        flex: 0.9, 
        fontSize: 18, 
        textAlign: "center", 
        color: "#fff", 
        fontWeight: 600
    },

    searchContainer: {
        gap: hp(2),
        alignItems: "center", 
    },

    searchBar: {
        width: wp(90),
        borderRadius: hp(8),
        paddingHorizontal: 12,
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "#0d1520",
        borderColor: "#28313d96",
    },

    resultContainer: {
        width: wp(90),
        backgroundColor: "#0d1520",
        borderColor: "#28313d96",
        borderRadius: hp(1),
        padding: 12,
    },

    resultButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        flexDirection: "row",
    },

    leftContent: {
        gap: wp(2.2),
        alignItems: "center",
        flexDirection: "row"
    },

    flag: {
        width: wp(8),
        height: hp(2.5),

        borderRadius: 4,
    },

    city: {
        fontSize: hp(1.9),
        fontWeight: "700",

        color: "#ffff",
    },

    country: {
        marginTop: hp(0.3),

        fontSize: hp(1.5),

        color: "#64748B",
    },

    separator: {
        height: 1,
        backgroundColor: "#28313d96",
    },

    input: {
        flex: 1,
        marginLeft: hp(2),
        color: "#fff",
        fontSize: 16
    },

    geoButton: {
        width: wp(90),
        borderRadius: hp(1),
        borderWidth: 1,
        paddingHorizontal: 12,
        padding: 16,
        alignItems: "center",
        backgroundColor: "#0d1520",
        borderColor: "#28313d96",
    },

    geoText: {
        flex: 1,
        marginLeft: hp(2),
        fontSize: 16,
        color: "#2563EB"
    }
})