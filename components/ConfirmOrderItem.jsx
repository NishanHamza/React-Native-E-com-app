import { View, Text, Image } from "react-native";
import React from "react";

const ConfirmOrderItem = ({ price, name, quantity, image }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
        }}
      />
      <Text>{name}</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>{quantity} X </Text>
        <Text
          style={{
            marginHorizontal: 10,
          }}
        >
          ${price}
        </Text>
      </View>
    </View>
  );
};

export default ConfirmOrderItem;
