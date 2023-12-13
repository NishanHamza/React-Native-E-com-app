import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  color1: "#fab428",
  color1_light: "rgba(227,25,99,1)",
  color1_light2: "rgba(199,0,73,0.8)",
  color2: "white",
  color3: "rgb(45,45,45)",
  color4: "transparent",
  color5: "#f2f2f2",
  color6: "#f7f7f7",
};

export const defaultStyle = StyleSheet.create({
  padding: 20,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  flex: 1,
  backgroundColor: colors.color2,
});

export const inputStyling = StyleSheet.create({
  // height: 50,
  backgroundColor: colors.color2,
  marginVertical: 10,
  marginHorizontal: 20,
});

export const inputOption = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    backgroundColor: colors.color3,
    flex: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    elevation: 10,
  },
  forget: {
    fontWeight: "100",
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  or: {
    color: colors.color2,
    fontWeight: "100",
    fontSize: 20,
    alignSelf: "center",
  },
  link: {
    color: colors.color2,
    fontSize: 18,
    alignSelf: "center",
    margin: 20,
    textTransform: "uppercase",
  },
});

export const defaultImg =
  "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Image-Transparent-Background.png";
