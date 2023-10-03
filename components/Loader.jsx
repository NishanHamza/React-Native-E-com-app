import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../styles/styles";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{ top: "50%", position: "absolute", alignSelf: "center" }}
      color={colors.color3}
      size={100}
    />
  );
};

export default Loader;
