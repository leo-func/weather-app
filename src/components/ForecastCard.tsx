import { LinearGradient } from "expo-linear-gradient"
import { Image, StyleSheet, Text, View } from "react-native"

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen"

import { Forecast } from "../model/forecast.model"
import { ToInt } from "../utils/ToInt"

type ForecastCardProps = {
    forecast : Forecast | null
}

export function ForecastCard ({
    forecast
}: ForecastCardProps){

    return (

        <View style={styles.wrapper}>

            <Text style={styles.title}>
                Previsão por hora
            </Text>

            <View style={styles.container}>

                {forecast?.list.slice(0, 5).map((cast, index) => (

                    index === 0 ? (

                        <LinearGradient
                            key={cast.dt_txt}
                            colors={["#3075fd", "#6097fc"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
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

                        <View
                            key={cast.dt_txt}
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

                        </View>

                    )

                ))}

            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    wrapper: {
        marginTop: hp(3),
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: wp(5),
        marginBottom: hp(1.5),
        color: "#111"
    },

    container: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },

    contentContainer: {

        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        width: wp(17),
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

        backgroundColor: "#fff",

        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        width: wp(17),
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
        color: "#111",
        fontSize: 12
    },

    secondaryTemp: {
        color: "#111",
        fontWeight: "600"
    },

    image: {
        width: wp(15),
        height: hp(7)
    }
})