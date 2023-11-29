import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, formStyles } from "../styles/styles";
import Header from "../components/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useGetOrderDetails } from "../utils/hooks";
import { TextBox } from "../components/OrderItem";
import Loader from "../components/Loader";
import ConfirmOrderItem from "../components/ConfirmOrderItem";

const OrderDetails = ({ route: { params } }) => {
  const [orderProducts, setOrderProducts] = useState([]);

  const isFocused = useIsFocused();
  const navigate = useNavigation();

  const { loading, order } = useGetOrderDetails(isFocused, params.id);

  useEffect(() => {
    setOrderProducts(order.OrderItem);
  }, [order]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={{ ...defaultStyle }}>
          <Header back={true} />
          <View style={{ marginBottom: 20, paddingTop: 80 }}>
            <Text style={formStyles.heading}>Order Details</Text>
          </View>
          <TextBox title={"Order ID -#"} value={order._id} i={params.i} />
          <TextBox title={"Customer ID :"} value={order.user} i={params.i} />
          <TextBox
            title={"Order Time :"}
            value={order.createdAt}
            i={params.i}
          />
          <TextBox title={"Address :"} value={params.address} i={params.i} />
          <TextBox
            title={"Payment Method :"}
            value={order.paymentMethod}
            i={params.i}
          />
          <TextBox
            title={"Order Status :"}
            value={order.orderStatus}
            i={params.i}
          />
          <TextBox
            title={"Delivery Time :"}
            value={order.deliveredAt ? order.deliveredAt : "On Progress..."}
            i={params.i}
          />
          <View style={{ marginBottom: 20, paddingTop: 80 }}>
            <Text style={formStyles.heading}>Ordered Products</Text>
          </View>
          <ScrollView>
            {orderProducts.map((i) => (
              <TouchableOpacity
                key={i._id}
                onPress={() =>
                  navigate.navigate("productdetails", { id: i.product })
                }
              >
                <ConfirmOrderItem
                  name={i.name}
                  image={i.image}
                  price={i.price}
                  quantity={i.quantity}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default OrderDetails;
