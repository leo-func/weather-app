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


import { Skeleton } from "moti/skeleton";
import { Capitalize } from "../../utils/capitalize";
import { ToInt } from "../../utils/ToInt";

type WeatherHeroProps = {
    name: string
    state: string | undefined
    country: string
    temp?: number
    description?: string
    photo?: string
    icon?: string
    feels_like?: number
    temp_max?: number
    temp_min?: number
    loading: boolean
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
    loading,
    onLocationSelect
}: WeatherHeroProps) {

    return (
        <ImageBackground
            source={
                photo
                    ? { uri: photo }
                    : require("../../../assets/images/brasil.jpg")
            }
            style={styles.heroBackground}
            resizeMode="cover"
        >
            
            {/* Fade inferior */}
            <LinearGradient
                colors={[
                    "rgba(2,8,23,0)",
                    "rgba(2,8,23,0.15)",
                    "rgb(2, 8, 23)"
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.98 }}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.overlay}>

                <TouchableOpacity
                    style={styles.selectLocationButton}
                    onPress={onLocationSelect}
                >

                    <Image
                        source={require("../../../assets/images/icons/location.png")}
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: "#FFFFFF"
                        }}
                        resizeMode="contain"
                    />

                    <Text style={styles.locationText}>
                        {name
                            ? `${name}, ${state} ${country}`
                            : "Escolha uma localização"}
                    </Text>

                    <Text style={styles.arrow}>
                        ›
                    </Text>

                </TouchableOpacity>

                <View style={styles.header}>

                    <Text style={styles.h2}>
                        Como está o clima hoje?
                    </Text>

                    <Text style={styles.h4}>
                        Confira a previsão e planeje seu dia.
                    </Text>

                </View>

                <View style={styles.weatherContainer}>
                    {loading ? (
                        <View>

                            <Skeleton
                                width={wp(26)}
                                height={hp(8)}
                                radius={12}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: hp(1)
                                }}
                            >
                                <Skeleton
                                    width={wp(32)}
                                    height={hp(2.2)}
                                    radius={6}
                                />

                                <View style={{ marginLeft: 6 }}>
                                    <Skeleton
                                        width={24}
                                        height={24}
                                        radius={12}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: hp(1) }}>
                                <Skeleton
                                    width={wp(36)}
                                    height={hp(1.8)}
                                    radius={6}
                                />
                            </View>

                        </View>
                    ): (
                        <View>
                                
                            <Text style={styles.h1}>
                                {ToInt(temp)}º
                            </Text>
                            
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.weatherDescription}>
                                    {Capitalize(description)}
                                </Text>

                                <Image
                                    source={{
                                        uri: `https://openweathermap.org/img/wn/${icon}@4x.png`
                                    }}
                                    resizeMode="contain"
                                    style={styles.image}
                                />

                            </View>

                            <Text style={styles.tempInfo}>

                                <Text style={{ color: "rgb(255, 90, 90)" }}>
                                    Máx{" "}
                                </Text>

                                <Text style={styles.tempValue}>
                                    {ToInt(temp_max)}º
                                </Text>

                                {"  |  "}

                                <Text style={{ color: "#4DA3FF" }}>
                                    Mín{" "}
                                </Text>

                                <Text style={styles.tempValue}>
                                    {ToInt(temp_min)}º
                                </Text>

                            </Text>

                        </View>
                    )}

                </View>

            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    heroBackground: {
        width: wp(100),
        height: hp(38),
        alignSelf: "center",
        overflow: "hidden",

    },

    overlay: {
        flex: 1,

        paddingVertical: hp(3),
        paddingHorizontal: wp(6),
        gap: hp(3),

        justifyContent: "space-between",
    },

    header: {
        gap: 4,
    },

    weatherContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        flex: 1,
    },

    h1: {
        fontSize: hp(10),
        color: "#FFFFFF",
        fontWeight: "600",
    },

    h2: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    weatherDescription: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    h4: {
        fontSize: 13,
        color: "rgba(255,255,255,0.7)",
    },

    tempInfo: {
        marginTop: 4,
        fontSize: 12,
        color: "#FFFFFF90",
    },

    tempValue: {
        fontWeight: "600",
        color: "#FFFFFF",
    },

    feels_like: {
        gap: hp(0.5),
        flexDirection: "row",
        padding: hp(0.5),
        width: wp(38),
        borderRadius: 16,
        borderColor: "#97deff"
    },

    selectLocationButton: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,0.08)",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",

        paddingHorizontal: 14,
        paddingVertical: 10,

        borderRadius: wp(8),

        width: wp(58),
        marginTop: hp(2),
        alignSelf: "center"
    },

    locationText: {
        flex: 1,
        textAlign: "center",

        fontSize: 13,
        fontWeight: "600",

        color: "#FFFFFF",
    },

    arrow: {
        fontSize: 18,
        color: "#FFFFFF90",
    },

    image: {
        marginLeft: 4,
        width: 24,
        height: 24,
    }
})