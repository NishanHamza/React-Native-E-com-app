import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../../components/OrderItem";
import { defaultStyle, formStyles } from "../../styles/styles";
import { useIsFocused } from "@react-navigation/native";
import { useGetOrders, useMsgErrOther } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { processOrder } from "../../redux/actions/otherAction";

const AdminOrders = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = useMsgErrOther(dispatch, navigation, "admin");
  const updateHandler = (id) => {
    dispatch(processOrder(id));
  };
  return (
    <View style={{ ...defaultStyle }}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formStyles.heading}>All Orders</Text>
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
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
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

export default AdminOrders;
