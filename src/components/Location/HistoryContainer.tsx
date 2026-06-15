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

import { ChevronRight, Eraser } from "lucide-react-native";

import { Location } from "../../model/location.model";

type HistoryContainerProps = {
    historyData: Location[]
    onLocationSelect: (location: Location) => void
    onClearHistory: () => Promise<void>
}

export function HistoryContainer({
    historyData,
    onLocationSelect,
    onClearHistory
}: HistoryContainerProps) {

    return (

        <View style={styles.container}>
            <View style={{alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={styles.title}>
                    Locais recentes
                </Text>
                
                {historyData.length > 0 && 
                    <TouchableOpacity 
                        style={{borderColor: "#28313d96", borderWidth: 1, borderRadius: 4, padding: 4}}
                        onPress={onClearHistory}
                    >
                        <Eraser
                        size={20}
                        color="#fff"
                        />
                    </TouchableOpacity>
                }
            </View>

            {historyData.length > 0 ? (
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
                                color="#28313d96"
                            />

                        </TouchableOpacity>

                    )}

                />
                ) : (
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Image 
                        source={require("../../../assets/images/dog.png")}
                        style={{width: 100, height: 100}}
                        resizeMode="contain"
                        >

                        </Image>
                        <Text style={{color: "#fff", fontSize: 12}}>Não consegui farejar nenhum local...</Text>
                    </View>
                )
            }

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        width: wp(90),
        height: hp(22),

        padding: wp(4),

        borderRadius: hp(1),

        backgroundColor: "#0d1520",

        borderWidth: 1,
        borderColor: "#28313d96",
    },

    title: {
        fontSize: hp(2),
        fontWeight: "500",

        color: "#ffff",
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

});