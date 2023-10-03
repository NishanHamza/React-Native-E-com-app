import { View, Text} from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  inputOption,
  formStyles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const submitHandler = () => {
    alert("yeah");
  };

  const loading = false;

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* heading  */}
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formStyles.heading}>Change Password</Text>
      </View>
      <View style={formStyles.container}>
        <TextInput
          {...inputOption}
          placeholder="Old Password"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          {...inputOption}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Button
          loading={loading}
          textColor={colors.color2}
          disabled={oldPassword === "" || newPassword === ""}
          onPress={submitHandler}
          style={formStyles.btn}
        >
          Change
        </Button>
      </View>
    </View>
  );
};
export default ChangePassword;
