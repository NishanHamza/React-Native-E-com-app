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
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherAction";
import { useMsgErrOther } from "../utils/hooks";

const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());

  const dispatch = useDispatch();
  const loading = useMsgErrOther(dispatch, navigation, "profile");

  const submitHandler = () => {
    dispatch(updateProfile(name, email, address, country, city, pinCode));
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* heading  */}
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
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

export default UpdateProfile;
