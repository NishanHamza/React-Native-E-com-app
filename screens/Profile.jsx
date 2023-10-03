import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, defaultImg, formStyles } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const user = {
  name: "Nishan",
  email: "sample@gmail.com",
};

const loading = false;

const Profile = ({ navigation, route }) => {
  const [avater, setAvater] = useState();
  const logouthandler = () => {
    console.log("Signing Out");
  };
  const navigateHandler = (text) => {
    switch (text) {
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Admin":
        navigation.navigate("admin");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logouthandler();
        break;

      default:
      case "Orders":
        navigation.navigate("orders");
        break;
    }
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvater(route.params.image);
      //dispatch update here
    }
  }, [route.params]);

  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formStyles.heading}>Profile</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{ ...formStyles.container, flex: 0, alignItems: "center" }}
            >
              <Avatar.Image
                source={{
                  uri: avater ? avater : defaultImg,
                }}
                size={80}
                style={{ backgroundColor: colors.color1 }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button textColor={colors.color1}>Change Photo</Button>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.color2,
                  fontSize: 20,
                  fontWeight: "500",
                  marginTop: 10,
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  color: colors.color2,
                  fontWeight: "300",
                }}
              >
                {user.email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <ButtonBox
                  text={"Orders"}
                  handler={navigateHandler}
                  icon={"format-list-bulleted-square"}
                />
                <ButtonBox
                  text={"Admin"}
                  handler={navigateHandler}
                  icon={"view-dashboard"}
                  reversed={true}
                />
                <ButtonBox
                  text={"Profile"}
                  handler={navigateHandler}
                  icon={"pencil"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: 10,
                }}
              >
                <ButtonBox
                  text={"Password"}
                  handler={navigateHandler}
                  icon={"pencil"}
                />
                <ButtonBox
                  text={"Sign Out"}
                  handler={navigateHandler}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer activeRoute="profile" />
    </>
  );
};

export default Profile;
