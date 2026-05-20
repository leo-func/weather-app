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
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen"

import {
    ChevronLeft,
    MapPin,
    Search
} from "lucide-react-native"

import { HistoryContainer } from "../components/HistoryContainer"
import { useLocationViewModel } from "../viewmodel/location.viewmodel"

export function LocationView({
    history,
    locations,
    search,
    setSearch,
    HandleLocationSelect,
    loading,
    goToWeather,
    geoLoading,
    onGeoPress
}: ReturnType<typeof useLocationViewModel>) {

    const showGeoButton = search.trim().length < 2

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goToWeather}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Escolher localização
                </Text>

                <Image
                    source={require("../../assets/images/gifs/LocationPin.gif")}
                    style={styles.headerGif}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>

                <View style={styles.searchContainer}>
                    <Search size={18} color="#94A3B8" />

                    <TextInput
                        placeholder="Buscar cidade..."
                        placeholderTextColor="#94A3B8"
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                    />
                </View>

                {showGeoButton && (
                    <TouchableOpacity
                        style={styles.geoButton}
                        onPress={onGeoPress}
                        disabled={geoLoading}
                    >
                        {geoLoading ? (
                            <ActivityIndicator size="small" color="#64748B" />
                        ) : (
                            <>
                                <MapPin size={16} color="#64748B" />
                                <Text style={styles.geoText}>
                                    Usar minha localização
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}

                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#3B82F6"
                        style={{ marginTop: hp(3) }}
                    />
                ) : search.trim().length >= 2 ? (
                    <View style={styles.resultsContainer}>

                        <FlatList
                            style={styles.list}
                            data={locations}
                            keyExtractor={(item) =>
                                `${item.lat}-${item.lon}`
                            }
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.locationCard}
                                    onPress={() => HandleLocationSelect(item)}
                                >
                                    <View style={styles.locationInfo}>
                                        <Image
                                            source={{
                                                uri: `https://flagcdn.com/w40/${item.country.toLowerCase()}.png`
                                            }}
                                            style={styles.flag}
                                        />

                                        <View>
                                            <Text style={styles.cityName}>
                                                {item.name}
                                            </Text>

                                            <Text style={styles.countryName}>
                                                {[item.state, item.country]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </Text>
                                        </View>
                                    </View>

                                    <MapPin size={20} color="#3B82F6" />
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={goToWeather}
                        >
                            <Text style={styles.buttonText}>
                                Ver clima desta localização
                            </Text>
                        </TouchableOpacity>

                        <HistoryContainer
                            historyData={history}
                            onLocationSelect={HandleLocationSelect}
                        />

                    </View>
                ) : (
                    <HistoryContainer
                        historyData={history}
                        onLocationSelect={HandleLocationSelect}
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9F9FA",
    },

    header: {
        alignItems: "center",
        paddingTop: hp(6),
        paddingBottom: hp(10),
        backgroundColor: "#F9F9FA",
    },

    backButton: {
        position: "absolute",
        left: wp(5),
        top: hp(6),
        zIndex: 10,
    },

    headerTitle: {
        fontSize: hp(2.2),
        fontWeight: "700",
        color: "#0F172A",
    },

    headerGif: {
        width: wp(100),
        height: hp(40),
        marginTop: hp(1),
        alignSelf: "center",
    },

    content: {
        flex: 1,
        backgroundColor: "#F9F9FA",

        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,

        paddingHorizontal: wp(5),

        marginTop: -hp(18),

        zIndex: 10,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(3),

        height: hp(6.5),

        borderRadius: 18,
        paddingHorizontal: wp(4),

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#E2E8F0",

        // 👇 FLUTUAÇÃO REAL
        zIndex: 20,
        elevation: 6,

        // sombra iOS leve
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },

    input: {
        flex: 1,
        fontSize: hp(1.8),
        color: "#0F172A",
    },

    resultsContainer: {
        gap: hp(1.5),
        marginTop: hp(1.5),
    },

    list: {
        height: hp(16),
    },

    locationCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: wp(4),
        paddingVertical: hp(1),

        borderRadius: 16,

        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    locationInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(3),
    },

    flag: {
        width: wp(8),
        height: hp(2.5),
        borderRadius: 4,
    },

    cityName: {
        fontSize: hp(1.8),
        fontWeight: "700",
        color: "#0F172A",
    },

    countryName: {
        marginTop: hp(0.2),
        fontSize: hp(1.4),
        color: "#64748B",
    },

    button: {
        height: hp(5.5),
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3B82F6",
    },

    buttonText: {
        fontSize: hp(1.7),
        fontWeight: "700",
        color: "#FFFFFF",
    },
    
    geoButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2),

        marginTop: hp(1),

        alignSelf: "flex-start",

        paddingVertical: hp(0.8),
        paddingHorizontal: wp(3),

        borderRadius: 12,

        backgroundColor: "#F1F5F9",
    },

    geoText: {
        fontSize: hp(1.5),
        color: "#64748B",
        fontWeight: "500",
    }

});