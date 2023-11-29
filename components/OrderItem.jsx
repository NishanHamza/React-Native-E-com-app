import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OrderItem = ({
  id,
  i,
  address,
  price,
  orderOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
}) => {
  const navigate = useNavigation();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
      }}
    >
      <TouchableOpacity
        onPress={() => navigate.navigate("orderdetails", { id, i: 0, address })}
      >
        <Text
          style={{
            ...styles.text,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
          }}
        >
          ID - #{id}
        </Text>
        <TextBox title={"Address"} value={address} i={i} />
        <TextBox title={"Orderd On"} value={orderOn} i={i} />
        <TextBox title={"Price"} value={price} i={i} />
        <TextBox title={"Status"} value={status} i={i} />
        <TextBox title={"Payment Method"} value={paymentMethod} i={i} />
        {admin && (
          <Button
            style={{
              marginTop: 10,
            }}
            icon={"update"}
            mode="outlined"
            textColor={i % 2 === 0 ? colors.color3 : colors.color2}
            onPress={() => updateHandler(id)}
            loading={loading}
            disabled={loading}
          >
            Update
          </Button>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}> {title} - </Text>
    {title === "Price" ? "$" : ""}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default OrderItem;
