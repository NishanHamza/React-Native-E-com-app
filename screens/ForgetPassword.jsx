import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  inputOption,
  formStyles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useMsgErrOther } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../redux/actions/otherAction";

const ForgetPassword = ({ navigation }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const loading = useMsgErrOther(dispatch, navigation, "verify");

  const submitHandler = () => {
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <View style={defaultStyle}>
        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formStyles.heading}>Forget Password</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOption}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={email === ""}
            onPress={submitHandler}
            style={formStyles.btn}
          >
            Send OTP
          </Button>
          <Text style={formStyles.or}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={formStyles.link}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isKeyboardVisible && <Footer activeRoute={"profile"} />}
    </>
  );
};

export default ForgetPassword;
