import {
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

export function FooterMenu() {

  return (
    <View style={styles.container}>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menuButton}
      >

        <View style={styles.imageContainer}>

          <Image
            source={require("../../assets/images/icons/weather.png")}
            style={styles.image}
            resizeMode="contain"
          />

            <Text style={styles.menuText}>
            Clima
            </Text>
        </View>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: hp(0),

    alignSelf: "center",

    width: wp(100),
    height: hp(11),

    backgroundColor: "rgba(255,255,255,0.85)",

    justifyContent: "center",
    alignItems: "center",

  },

  menuButton: {
    alignItems: "center",
    justifyContent: "center",

    gap: hp(0.5),
  },

  imageContainer: {
    width: wp(18),
    height: wp(16),
    marginBottom: hp(1),
    gap: 4,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(59,130,246,0.10)",
  },

  image: {
    width: wp(7),
    height: wp(7),
  },

  menuText: {
    fontSize: hp(1.5),
    fontWeight: "600",

    color: "#1E293B",
  },

});