import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  inputOption,
  formStyles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";


const UpdateProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const disableBtn =
    !name || !email || !address || !city || !country || !pinCode;

  const submitHandler = () => {
    alert("yeah");
  };

  const loading = false;

  return (

      <View style={defaultStyle}>
      <Header back={true} />
        {/* heading  */}
        <View style={{ marginBottom: 20 ,paddingTop: 80}}>
          <Text style={formStyles.heading}>Update Profile</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={formStyles.container}>
            <TextInput
              {...inputOption}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              {...inputOption}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOption}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <TextInput
              {...inputOption}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />

            <TextInput
              {...inputOption}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />

            <TextInput
              {...inputOption}
              placeholder="Pin Code"
              value={pinCode}
              onChangeText={setPinCode}
            />

            <Button
              loading={loading}
              textColor={colors.color2}
              disabled={disableBtn}
              onPress={submitHandler}
              style={formStyles.btn}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </View>
  );
};

export default UpdateProfile