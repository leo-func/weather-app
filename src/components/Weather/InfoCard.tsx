import {
    Droplets,
    Thermometer,
    Wind
} from "lucide-react-native";
import { Skeleton } from "moti/skeleton";

import { StyleSheet, Text, View } from "react-native";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { ToInt } from "../../utils/ToInt";

type InfoCardProps = {
    speed: number | undefined,
    humidity: number | undefined,
    feels_like: number | undefined,
    loading: boolean
}

export function InfoCard({
    speed,
    humidity,
    feels_like,
    loading
}: InfoCardProps) {

    return (
        <View style={styles.Mcontainer}>

            <View style={styles.container}>

                <Wind
                    size={24}
                    color="#2563EB"
                    strokeWidth={2}
                />

                {loading ? (
                    <Skeleton
                        width={wp(12)}
                        height={hp(1.8)}
                        radius={6}
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#ffffff"
                        }}
                    >
                        {speed} km/h
                    </Text>
                )}

                <Text
                    style={{
                        fontSize: 10,
                        color: "#ffffff"
                    }}
                >
                    Vento
                </Text>

            </View>

            <View style={styles.container}>

                <Droplets
                    size={24}
                    color="#2563EB"
                    strokeWidth={2}
                />

                {loading ? (
                    <Skeleton
                        width={wp(10)}
                        height={hp(1.8)}
                        radius={6}
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#ffffff"
                        }}
                    >
                        {humidity}%
                    </Text>
                )}

                <Text
                    style={{
                        fontSize: 10,
                        color: "#ffffff"
                    }}
                >
                    Umidade
                </Text>

            </View>

            <View style={styles.container}>

                <Thermometer
                    size={24}
                    color="#2563EB"
                    strokeWidth={2}
                />

                {loading ? (
                    <Skeleton
                        width={wp(8)}
                        height={hp(1.8)}
                        radius={6}
                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#ffffff"
                        }}
                    >
                        {ToInt(feels_like)}º
                    </Text>
                )}

                <Text
                    style={{
                        fontSize: 10,
                        color: "#ffffff",
                        textAlign: "center",
                        alignItems: "center"
                    }}
                >
                    Sensação térmica
                </Text>

            </View>

        </View>
    );
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
        borderColor: "#28313d96",
        borderWidth: 1,
        backgroundColor: "#0b1722",
        borderRadius: 10,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        height: hp("12"),
        width: wp("29"),
    }
});