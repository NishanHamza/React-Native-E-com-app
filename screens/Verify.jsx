import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  inputOption,
  formStyles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = () => {
    navigation.navigate("login");
  };

  const loading = false;

  return (
    <>
      <View style={defaultStyle}>
        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formStyles.heading}>Reset Password</Text>
        </View>
        <View style={formStyles.container}>
          <TextInput
            {...inputOption}
            placeholder="OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TextInput
            {...inputOption}
            placeholder="New Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={otp === "" || password === ""}
            onPress={submitHandler}
            style={formStyles.btn}
          >
            Reset Password
          </Button>
          <Text style={formStyles.or}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={formStyles.link}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer activeRoute={"profile"} />
    </>
  );
};

export default Verify;
