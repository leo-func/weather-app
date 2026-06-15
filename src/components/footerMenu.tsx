import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export function FooterMenu() {

  return (
    <LinearGradient
    colors={["#132331", "#0b1722"]}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.container}>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menuButton}
      >

        <LinearGradient 
        colors={["#132331", "#0b1722"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.imageContainer}>

          <Image
            source={require("../../assets/images/icons/weather.png")}
            style={styles.image}
            resizeMode="contain"
          />

            <Text style={styles.menuText}>
            Clima
            </Text>
        </LinearGradient>

      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: hp(2),

    alignSelf: "center",

    width: wp(80),
    height: hp(6),
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    elevation: 8

  },

  menuButton: {
    alignItems: "center",
    justifyContent: "center",

    gap: hp(0.5),
  },

  imageContainer: {
    width: wp(28),
    height: wp(16),
    marginBottom: hp(1),
    gap: 4,

    borderRadius: wp(8),
    
    borderColor: "#1960f03f",
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",

  },

  image: {
    width: wp(7),
    height: wp(7),
  },

  menuText: {
    fontSize: hp(1.5),
    fontWeight: "600",

    color: "#619bf4",
  },

});