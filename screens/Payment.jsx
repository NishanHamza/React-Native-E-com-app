import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/actions/otherAction";
import { useMsgErrOther } from "../utils/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { server } from "../redux/store";
import { useStripe } from "@stripe/stripe-react-native";
import Loader from "../components/Loader";

const Payment = ({ navigation, route }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const stripe = useStripe();

  const redirectToLogin = () => {
    navigation.navigate("login");
  };

  const codHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user.address,
      city: user.city,
      country: user.country,
      pinCode: user.pinCode,
    };
    const itemPrice = route.params.itemsPrice;
    const shippingCharge = route.params.shippingCharge;
    const taxPrice = route.params.tax;
    const totalAmount = route.params.totalAmount;
    dispatch(
      placeOrder(
        shippingInfo,
        (orderItem = cartItems),
        paymentMethod,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingCharge,
        totalAmount
      )
    );
  };

  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        {
          totalAmount: route.params.totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "Nishan's Store",
      });

      if (init.error)
        return Toast.show({ type: "error", text1: init.error.message });

      const presentSheet = await stripe.presentPaymentSheet();
      setLoaderLoading(true);

      if (presentSheet.error) {
        setLoaderLoading(false);
        return Toast.show({ type: "error", text1: presentSheet.error.message });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        client_secret
      );

      if (paymentIntent.status === "Succeeded") {
        codHandler({ id: paymentIntent.id, status: paymentIntent.status });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Some Error",
        text2: error,
      });
    }
  };

  const loading = useMsgErrOther(dispatch, navigation, "profile", () => ({
    type: "clearCart",
  }));

  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        styling={{
          paddingTop: 70,
        }}
        text1={"Payment"}
        text2={"Method"}
      />
      <View style={styles.container}>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}
        >
          <View style={styles.radioStyle}>
            <Text style={styles.raduiStyleText}>Cash On Delivery</Text>
            <RadioButton color={colors.color1} value={"COD"} />
          </View>
          <View style={styles.radioStyle}>
            <Text style={styles.raduiStyleText}>Online Pay</Text>
            <RadioButton color={colors.color1} value={"ONLINE"} />
          </View>
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === "COD"
            ? () => codHandler()
            : onlineHandler
        }
      >
        <Button
          disabled={loading}
          loading={loading}
          style={styles.btn}
          textColor={colors.color2}
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }
        >
          {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    borderRadius: 10,
    padding: 30,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },
  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  raduiStyleText: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});

export default Payment;
