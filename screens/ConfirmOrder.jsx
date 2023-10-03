import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { cartItems } from "./Cart";
import ConfirmOrderItem from "../components/ConfirmOrderItem";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ConfirmOrder = () => {
  const itemPrice = 400;
  const shippingCharge = 50;
  const tax = 0.18 * itemPrice;
  const totalAmount = itemPrice + shippingCharge + tax;

  const navigate = useNavigation();
  return (
    <View style={{ ...defaultStyle }}>
      <Header back={true} />
      <Heading
        text1={"Confirm"}
        text2={"Order"}
        styling={{
          paddingTop: 70,
        }}
      />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          {cartItems.map((i) => (
            <ConfirmOrderItem
              key={i.product}
              name={i.name}
              image={i.image}
              price={i.price}
              quantity={i.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={"Subtotal"} value={itemPrice} />
      <PriceTag heading={"Shipping"} value={shippingCharge} />
      <PriceTag heading={"Tax"} value={tax} />
      <PriceTag heading={"Total"} value={totalAmount} />

      <TouchableOpacity
        onPress={() =>
          navigate.navigate("payment", {
            itemPrice,
            shippingCharge,
            tax,
            totalAmount,
          })
        }
      >
        <Button
          icon={"chevron-right"}
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({ heading, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    }}
  >
    <Text
      style={{
        fontWeight: "800",
      }}
    >
      {heading}
    </Text>
    <Text>{value}</Text>
  </View>
);

export default ConfirmOrder;
