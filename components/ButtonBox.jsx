import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";

const ButtonBox = ({
  text,
  handler,
  icon,
  reversed = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: reversed ? colors.color1 : colors.color3,
        width: 80,
        height: 80,
        alignItems: "center",
        borderRadius: 20,
      }}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={colors.color2}
        style={{
          backgroundColor: reversed ? colors.color1 : colors.color3,
        }}
        icon={icon}
      />
      <Text
        style={{
          color: colors.color2,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;
