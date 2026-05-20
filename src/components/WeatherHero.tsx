import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { Capitalize } from "../utils/capitalize";
import { ToInt } from "../utils/ToInt";

type WeatherHeroProps = {
    name: string
    state: string
    country: string
    temp?: number
    description?: string
    photo?: string
    icon?: string
    feels_like?: number
    temp_max?: number
    temp_min?: number
    onLocationSelect: () => void
}

export function WeatherHero({
    name,
    state,
    country,
    temp,
    description,
    photo,
    icon,
    temp_max,
    temp_min,
    onLocationSelect
}: WeatherHeroProps) {

    return (

        <ImageBackground
            source={photo ? { uri: photo } : require("../../assets/images/brasil.jpg")}
            style={styles.heroBackground}
            imageStyle={{ borderRadius: 24 }}
            resizeMode="cover"
        >

            <LinearGradient
                colors={[
                    "rgb(255, 255, 255)",
                    "rgba(255, 255, 255, 0.25)",
                    "rgba(255, 255, 255, 0)"
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.5, y: 0 }}
                style={styles.overlay}
            >

                <View style={styles.header}>

                    <Text style={styles.h2}>
                        Como está o clima hoje?
                    </Text>

                    <Text style={styles.h4}>
                        Confira a previsão e planeje seu dia.
                    </Text>

                </View>

                <View style={styles.weatherContainer}>

                    <View>

                        <Text style={styles.h1}>
                            {ToInt(temp)}º
                        </Text>

                        <Text style={styles.h2}>
                            {Capitalize(description)}
                        </Text>

                        <Text style={{ color: "#000000", fontSize: 12 }}>

                            <Text style={{ color: "#f80000" }}>
                                Máx{" "}
                            </Text>

                            <Text
                                style={{
                                    fontWeight: "600",
                                    color: "#000000"
                                }}
                            >
                                {ToInt(temp_max)}º
                            </Text>

                            {"  •  "}

                            <Text style={{ color: "#0077ff" }}>
                                Mín{" "}
                            </Text>

                            <Text
                                style={{
                                    fontWeight: "600",
                                    color: "#000000"
                                }}
                            >
                                {ToInt(temp_min)}º
                            </Text>

                        </Text>

                        <TouchableOpacity
                            style={styles.selectLocationButton}
                            onPress={onLocationSelect}
                        >

                            <Image
                                source={require("../../assets/images/icons/location.png")}
                                style={{ width: 20, height: 20 }}
                                resizeMode="contain"
                            />
                            
                            <Text style={styles.locationText}>
                            {name
                                ? `${name}, ${state}, ${country}`
                                : "Escolha uma localização"}
                            </Text>

                            <Text style={styles.arrow}>
                                ›
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View>

                        <Image
                            source={{
                                uri: `https://openweathermap.org/img/wn/${icon}@4x.png`
                            }}
                            resizeMode="contain"
                            style={styles.image}
                        />

                    </View>

                </View>

            </LinearGradient>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    heroBackground: {
        width: wp(92),
        alignSelf: "center",
        marginTop: hp(5),
        overflow: "hidden",
        borderRadius: 24,
        shadowColor: "#252525",
        elevation: 8
    },

    overlay: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
    },

    h1: {
        fontSize: hp("8")
    },

    h2: {
        fontSize: 18,
        fontWeight: "600"
    },

    h4: {
        fontSize: 12,
        color: "#00000069"
    },

    header: {
        gap: 5,
    },

    weatherContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    feels_like: {
        gap: hp(0.5),
        backgroundColor: "#d5e0f4",
        flexDirection: "row",
        padding: hp(0.5),
        width: wp(38),
        borderRadius: 16,
        borderColor: "#97deff"
    },

    selectLocationButton: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255, 1)",

        paddingHorizontal: 10,
        paddingVertical: 6,

        borderRadius: 6,

        marginTop: hp(2),

        width: wp(53),

        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,

        // Android shadow
        elevation: 6,
    },

    locationText: {
        flex: 1,
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
    },

    arrow: {
        fontSize: 16,
    },

    image: {
        position: "absolute",
        right: hp(10),
        bottom: hp(1),
        width: wp("30"),
        height: hp("10"),
    }
})