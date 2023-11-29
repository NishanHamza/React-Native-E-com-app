import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const incrementHandler = (product, name, price, stock, image, quantity) => {
    if (stock <= quantity) return;
    quantity += 1;
    dispatch({
      type: "addToCart",
      payload: { product, name, price, stock, image, quantity },
    });
  };

  const decrementHandler = (product, name, price, stock, image, quantity) => {
    if (quantity <= 1) {
      dispatch({
        type: "removeFromCart",
        payload: product,
      });
    } else {
      quantity -= 1;
      dispatch({
        type: "addToCart",
        payload: { product, name, price, stock, image, quantity },
      });
    }
  };

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
          {cartItems.length > 0 ? (
            cartItems.map((i, index) => (
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
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 18 }}>No Items</Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>
          {cartItems.length} {cartItems.length > 1 ? "items" : "item"}{" "}
        </Text>
        <Text>
          $
          {cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )}
        </Text>
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
