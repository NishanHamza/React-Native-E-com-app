import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({id, deleteHandler, setOpenModal, navigate}) => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onPress={() => setOpenModal(false)}
      >
        <Avatar.Icon
          icon={"close"}
          size={25}
          style={{
            backgroundColor: colors.color1,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.text} onPress={() => navigate.navigate("updateproduct", {id})}> Edit</Text>
      <Button textColor={colors.color1} style={styles.text} onPress={() => deleteHandler(id)}> Delete</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: 200,
    height: 100,
    alignSelf: "center",
    zIndex: 100,
    justifyContent: "center",
    backgroundColor: colors.color2,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: '900'
    ,textAlign: 'center'
    ,textTransform: "uppercase"
  }
});

export default MyModal;
