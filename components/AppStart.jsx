import { View, StatusBar, Platform, StyleSheet } from "react-native";
import Loader from "./Loader";

const AppStart = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Loader />
    </View>
  );
};

export default AppStart;
