import { View, Text, ScrollView } from "react-native";
import React from "react";
import { defaultStyle, formStyles } from "../styles/styles";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../components/OrderItem";

export const orders = [
  {
    _id: "ffsadfa",
    shippingInfo: {
      address: " 23 agg",
      city: "dhaka",
      country: "BD",
      pinCode: 124213,
    },
    createdAt: "12-3-21",
    orderStatus: "processing",
    totalAmount: 4534,
    paymentMethod: "Online",
  },
  {
    _id: "ffsadffsdfgga",
    shippingInfo: {
      address: " 23 agg",
      city: "dhaka",
      country: "Bd",
      pinCode: 45654,
    },
    createdAt: "12-3-21",
    orderStatus: "processing",
    totalAmount: 6634,
    paymentMethod: "Online",
  },
];

const Orders = () => {
  const loading = false;
  return (
    <View style={{ ...defaultStyle }}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formStyles.heading}>Orders</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderOn={item.createdAt}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country},${item.shippingInfo.pinCode}`}
                />
              ))
            ) : (
              <Headline style={{ alignSelf: "center" }}>No Orders Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Orders;
