import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  defaultImg,
  inputOption,
  formStyles,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/userAction";
import { useMsgErrUser } from "../utils/hooks";
import mime from "mime";

const SignUp = ({ navigation, route }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [avater, setAvater] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const disableBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;

  const dispatch = useDispatch();

  const loading = useMsgErrUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("address", address);
    myForm.append("city", city);
    myForm.append("country", country);
    myForm.append("pinCode", pinCode);

    if (avater !== "") {
      myForm.append("file", {
        uri: avater,
        type: mime.getType(avater),
        name: avater.split("/").pop(),
      });
    }

    dispatch(signup(myForm));
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvater(route.params.image);
    }
  }, [route.params]);

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
          <Text style={formStyles.heading}>Sign Up</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={formStyles.container}>
            <Avatar.Image
              source={{
                uri: avater ? avater : defaultImg,
              }}
              size={80}
              style={{ alignSelf: "center", backgroundColor: colors.color1 }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>
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
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
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
              Sign Up
            </Button>
            <Text style={formStyles.or}>OR</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={{ ...formStyles.link, paddingBottom: 70 }}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {!isKeyboardVisible && <Footer activeRoute={"profile"} />}
    </>
  );
};

export default SignUp;
