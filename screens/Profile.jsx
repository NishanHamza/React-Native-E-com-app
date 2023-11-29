import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, defaultImg, formStyles } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../redux/actions/userAction";
import { useMsgErrOther, useMsgErrUser } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { updatePic } from "../redux/actions/otherAction";

const Profile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);

  const [avater, setAvater] = useState(defaultImg);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading } = useMsgErrUser(navigation, dispatch, "login");

  const logouthandler = () => {
    dispatch(logout());
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

  const loadingPic = useMsgErrOther(dispatch, null, null, loadUser);

  useEffect(() => {
    if (route.params?.image) {
      setAvater(route.params.image);
      const myForm = new FormData();

      myForm.append("file", {
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop(),
      });
      dispatch(updatePic(myForm));
    }
    dispatch(loadUser());
  }, [route.params, dispatch, isFocused]);

  useEffect(() => {
    setAvater(user?.avater?.url);
  }, [user]);

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
                  uri: avater,
                }}
                size={80}
                style={{ backgroundColor: colors.color1 }}
              />
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button
                  disabled={loadingPic}
                  loading={loadingPic}
                  textColor={colors.color1}
                >
                  Change Photo
                </Button>
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.color2,
                  fontSize: 20,
                  fontWeight: "500",
                  marginTop: 10,
                }}
              >
                {user?.name}
              </Text>
              <Text
                style={{
                  color: colors.color2,
                  fontWeight: "300",
                }}
              >
                {user?.email}
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
                {user?.role === "admin" && (
                  <ButtonBox
                    text={"Admin"}
                    handler={navigateHandler}
                    icon={"view-dashboard"}
                    reversed={true}
                  />
                )}
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
