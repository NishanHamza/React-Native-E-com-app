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
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userAction";
import { useMsgErrUser } from "../utils/hooks";

const Login = ({ navigation }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loading = useMsgErrUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    dispatch(login(email, password));
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
          <Text style={formStyles.heading}>Login</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOption}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            {...inputOption}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={formStyles.forget}>Forget Password?</Text>
          </TouchableOpacity>
          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={email === "" || password === ""}
            onPress={submitHandler}
            style={formStyles.btn}
          >
            Log In
          </Button>
          <Text style={formStyles.or}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={formStyles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isKeyboardVisible && <Footer activeRoute={"profile"} />}
    </>
  );
};

export default Login;
