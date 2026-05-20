import { Image, StyleSheet, Text, View } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { ToInt } from "../utils/ToInt"

type InfoCardProps = {
    speed: number | undefined,
    humidity: number | undefined,
    feels_like: number | undefined
}

export function InfoCard ({
    speed,
    humidity,
    feels_like,
}: InfoCardProps){

    return (
        <View style={styles.Mcontainer}>
            <View style={styles.container}>

                <Image
                    source={require("../../assets/images/icons/wind.png")}
                    style={{ width: 24, height: 24}}
                    resizeMode="contain"
                >
                </Image>

                <Text style={{ fontSize: 14, fontWeight: "600"}}>{speed} km/h </Text>
                <Text style={{ fontSize: 10, color: "#000000b6"}}> Vento </Text>
            </View>

            <View style={styles.container}>

                <Image
                    source={require("../../assets/images/icons/humidity.png")}
                    style={{ width: 24, height: 24}}
                    resizeMode="contain"
                >
                </Image>

                <Text style={{ fontSize: 14, fontWeight: "600"}}>{humidity}%</Text>
                <Text style={{ fontSize: 10, color: "#000000b6"}}> Umidade </Text>
            </View>

            <View style={styles.container}>

                <Image
                    source={require("../../assets/images/icons/thermometer.png")}
                    style={{ width: 24, height: 24}}
                    resizeMode="contain"
                >
                </Image>

                <Text style={{ fontSize: 14, fontWeight: "600"}}>{ToInt(feels_like) + "º"}</Text>
                <Text style={{ fontSize: 10, color: "#000000b6", textAlign: "center", alignItems: "center"}}> Sensação térmica </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    Mcontainer: {
        flexDirection: "row",
        gap: hp(1),
        justifyContent: "center",
        marginTop: hp("2"),
    },

    container: {
        gap: hp("0.6"),
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        height: hp("12"),
        width: wp("29"),
        
        // iOS shadow
        shadowColor: "#00000098",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,

        // Android shadow
        elevation: 2,
    }
})