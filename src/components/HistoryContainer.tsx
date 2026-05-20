import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import { ChevronRight } from "lucide-react-native";

import { History } from "../model/history.model";
import { Location } from "../model/location.model";

type HistoryContainerProps = {
    historyData: History[]
    onLocationSelect: (location: Location) => void
}

export function HistoryContainer({
    historyData,
    onLocationSelect,
}: HistoryContainerProps) {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Locais recentes
            </Text>

            <FlatList

                scrollEnabled={true}

                data={historyData}

                keyExtractor={(item) =>
                    `${item.lat}-${item.lon}`
                }

                ItemSeparatorComponent={() =>
                    <View style={styles.separator} />
                }

                renderItem={({ item }) => (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.card}
                        onPress={() => onLocationSelect(item)}
                    >

                        <View style={styles.leftContent}>

                            <Image
                                source={{ uri: item.flag }}
                                style={styles.flag}
                            />

                            <View>

                                <Text style={styles.city}>
                                    {item.name}
                                </Text>

                                <Text style={styles.country}>
                                    {[item.state, item.country]
                                        .filter(Boolean)
                                        .join(", ")
                                    }
                                </Text>

                            </View>

                        </View>

                        <ChevronRight
                            size={20}
                            color="#94A3B8"
                        />

                    </TouchableOpacity>

                )}

            />

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        height: hp(23),
        
        marginTop: hp(2),

        padding: wp(4),

        borderRadius: 24,

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    title: {
        marginBottom: hp(1),

        fontSize: hp(2.2),
        fontWeight: "700",

        color: "#0F172A",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: hp(1.2),
    },

    leftContent: {
        flexDirection: "row",
        alignItems: "center",

        gap: wp(3),
    },

    flag: {
        width: wp(8),
        height: hp(2.5),

        borderRadius: 4,
    },

    city: {
        fontSize: hp(1.9),
        fontWeight: "700",

        color: "#0F172A",
    },

    country: {
        marginTop: hp(0.3),

        fontSize: hp(1.5),

        color: "#64748B",
    },

    separator: {
        height: 1,

        backgroundColor: "#E2E8F0",
    },

});