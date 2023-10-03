import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";

export const cartItems = [
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadadffagaf",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadaergadfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadagjsdfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadaahsadfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadasdgfgdfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadawwgvddfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadhheradfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
  {
    price: 31,
    name: "Sample",
    stock: 20,
    product: "sadadadasdfff",
    quantity: 2,
    image:
      "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
  },
];

const Cart = () => {
  const incrementHandler = (id, qty, stock) => {
    console.log("increasing", id, qty, stock);
  };

  const decrementHandler = (id, qty) => {
    console.log("decreasing", id, qty);
  };

  const navigate = useNavigation();

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <Heading
        text1={"Shopping"}
        text2={"Cart"}
        styling={{ paddingTop: 70, marginLeft: 35 }}
      />
      <Header emptyCart={true} back={true} />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.map((i, index) => (
            <CartItem
              key={i.product}
              id={i.product}
              name={i.name}
              amount={i.price}
              stock={i.stock}
              imgSrc={i.image}
              index={index}
              qty={i.quantity}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              navigate={navigate}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>5 items</Text>
        <Text> 5$</Text>
      </View>
      <TouchableOpacity
        onPress={
          cartItems.length > 0 ? () => navigate.navigate("confirmorder") : null
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={"cart"}
          textColor={colors.color2}
        >
          Chekout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
