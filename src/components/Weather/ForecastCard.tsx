import { LinearGradient } from "expo-linear-gradient"
import { Image, StyleSheet, Text, View } from "react-native"

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen"

import { Skeleton } from "moti/skeleton"
import { Forecast } from "../../model/forecast.model"
import { ToInt } from "../../utils/ToInt"

type ForecastCardProps = {
    forecast : Forecast | null
    loading: boolean
}

export function ForecastCard ({
    forecast,
    loading
}: ForecastCardProps){

    return (
        <View style={styles.wrapper}>

            <Text style={styles.title}>
                Previsão por hora
            </Text>

            <View style={styles.container}>

                {loading ? (
                    [1, 2, 3, 4, 5].map((item, index) => (

                        <LinearGradient
                            key={item}
                            colors={["#132331", "#0b1722"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={
                                index === 0
                                    ? styles.contentContainer
                                    : styles.secondaryCard
                            }
                        >

                            <Skeleton
                                width={wp(8)}
                                height={hp(1.6)}
                                radius={6}
                            />

                            <View style={{ marginVertical: hp(1) }}>
                                <Skeleton
                                    width={wp(10)}
                                    height={hp(4)}
                                    radius={10}
                                />
                            </View>

                            <Skeleton
                                width={wp(7)}
                                height={hp(1.8)}
                                radius={6}
                            />

                        </LinearGradient>

                    ))
                ) : (
                    forecast?.list.slice(0, 5).map((cast, index) => (

                        index === 0 ? (

                            <LinearGradient
                                key={cast.dt_txt}
                                colors={["#132331", "#0b1722"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.contentContainer}
                            >

                                <Text style={styles.hourText}>
                                    {cast.dt_txt.slice(11, 16)}
                                </Text>

                                <Image
                                    source={{
                                        uri: `https://openweathermap.org/img/wn/${cast.weather[0].icon}@4x.png`
                                    }}
                                    resizeMode="contain"
                                    style={styles.image}
                                />

                                <Text style={styles.tempText}>
                                    {ToInt(cast.main.temp)}°
                                </Text>

                            </LinearGradient>

                        ) : (

                            <LinearGradient
                                key={cast.dt_txt}
                                colors={["#132331", "#0b1722"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.secondaryCard}
                            >

                                <Text style={styles.secondaryHour}>
                                    {cast.dt_txt.slice(11, 16)}
                                </Text>

                                <Image
                                    source={{
                                        uri: `https://openweathermap.org/img/wn/${cast.weather[0].icon}@4x.png`
                                    }}
                                    resizeMode="contain"
                                    style={styles.image}
                                />

                                <Text style={styles.secondaryTemp}>
                                    {ToInt(cast.main.temp)}°
                                </Text>

                            </LinearGradient>

                        )

                    ))
                )}

            </View>

        </View>
)

}

const styles = StyleSheet.create({

    wrapper: {
        alignSelf: "center",
        marginTop: hp(1),
        padding: 10,
        height: hp(19),
        borderColor: "#28313d96",
        backgroundColor: "#0b1722",
        borderWidth: 1,
        borderRadius: 12
    },

    title: {
        fontSize: 12,
        fontWeight: "600",
        marginLeft: wp(1),
        marginBottom: hp(1.5),
        color: "#ffff"
    },

    container: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },

    contentContainer: {
        borderColor: "#1960f03f",
        borderWidth: 1,
        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        width: wp(15),
        height: hp(13),

        // iOS shadow
        shadowColor: "#00000098",
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.18,
        shadowRadius: 10,

        // Android shadow
        elevation: 2,
    },

    secondaryCard: {
        borderColor: "#28313d96",
        borderWidth: 1,

        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        width: wp(15),
        height: hp(13),

        // iOS shadow
        shadowColor: "#00000098",
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.10,
        shadowRadius: 8,

        // Android shadow
        elevation: 2,
    },

    hourText: {
        color: "#fff",
        fontSize: 12
    },

    tempText: {
        color: "#fff",
        fontWeight: "600"
    },

    secondaryHour: {
        color: "#fff",
        fontSize: 12
    },

    secondaryTemp: {
        color: "#fff",
        fontWeight: "600"
    },

    image: {
        width: wp(15),
        height: hp(7)
    }
})