import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    heightPercentageToDP as hp
} from "react-native-responsive-screen";


import {
    ChevronLeft
} from "lucide-react-native";


import { SafeAreaView } from "react-native-safe-area-context";
import { HistoryContainer } from "../components/Location/HistoryContainer";
import { SearchContainer } from "../components/Location/SearchContainer";
import { ErrorModal } from "../components/shared/ErrorModal";
import { useLocationViewModel } from "../viewmodel/location.viewmodel";

export function LocationView({
    history,
    locations,
    search,
    setSearch,
    HandleLocationSelect,
    loading,
    goToWeather,
    HandleGeoLocation,
    HandleClearHistory,
    geoLoading,
    geoError,
    clearGeoError
}: ReturnType<typeof useLocationViewModel>) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToWeather} style={styles.backButton}>
                    <ChevronLeft size={24} color={"#fff"}/>
                </TouchableOpacity>

                <Text style={styles.headerTitle}> Escolher localização </Text>

            </View>

            <SearchContainer
                locations={locations}
                search={search}
                loading={loading}
                setSearch={setSearch}
                HandleLocationSelect={HandleLocationSelect}
                HandleGeoLocation={HandleGeoLocation}
                geoLoading={geoLoading}
                geoError={geoError}
            ></SearchContainer>
            
            <HistoryContainer
                historyData={history}
                onLocationSelect={HandleLocationSelect}
                onClearHistory={HandleClearHistory}
            />

            <ErrorModal
                visible={!!geoError}
                message={geoError}
                onClose={clearGeoError}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020817",
        alignItems: "center",
        gap: hp(4)
    },

    backButton: {
        backgroundColor: "#0d1520",
        borderColor: "#28313d96", 
        borderWidth: 1, 
        borderRadius: hp(8), 
        padding: 6
    },

    header: {
        marginTop: hp(2),
        flexDirection: "row",
        alignItems: "center",
    },

    headerTitle: {
        marginRight: hp(4),
        flex: 0.9,
        fontSize: 18, 
        textAlign: "center", 
        color: "#fff", 
        fontWeight: 600
    },

    backButtonPlaceholder: {
        backgroundColor: "#0d1520",
        borderColor: "#28313d96", 
        borderWidth: 1, 
        borderRadius: hp(8), 
        padding: 6
    }

});