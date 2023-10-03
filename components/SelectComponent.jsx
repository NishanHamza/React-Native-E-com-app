import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Avatar, Headline } from "react-native-paper";
import { colors } from "../styles/styles";

const SelectComponent = ({
  visible,
  setVisible,
  setCategory,
  setCategoryID,
  categories = [],
}) => {
  const selectCategoryHandler = (item) => {
    setCategoryID(item._id);
    setCategory(item.category);
    setVisible(false);
  };
  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Avatar.Icon
            style={{
              backgroundColor: colors.color1,
              alignSelf: "flex-end",
            }}
            size={30}
            icon={"close"}
          />
        </TouchableOpacity>
        <Headline style={styles.heading}>Select a Category</Headline>
        <ScrollView>
          {categories.map((i) => (
            <Text
              key={i._id}
              style={styles.text}
              onPress={() => selectCategoryHandler(i)}
            >
              {i.category}
            </Text>
          ))}
        </ScrollView>
      </View>
    )
  );
};

export default SelectComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    position: "absolute",
    padding: 35,
    borderRadius: 20,
    width: "90%",
    height: "90%",
    alignSelf: "center",
    elevation: 5,
    top: 50,
  },
  heading: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: colors.color3,
    borderRadius: 3,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: "100",
    textTransform: "uppercase",
    marginVertical: 10,
  },
});
