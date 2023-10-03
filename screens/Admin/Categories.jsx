import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formStyles,
  inputOption,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button, TextInput } from "react-native-paper";

const categories = [
  {
    name: "Laptop",
    id: "dgsdfg",
  },
  {
    name: "IDK",
    id: "dgssdgdfg",
  },
  {
    name: "KOLA",
    id: "dgssqadfg",
  },
];

const Categories = () => {
  const deleteHandler = (id) => {
    console.log("Category Deleted", id);
  };

  const [category, setCategory] = useState();

  const submitHandler = () => {};

  const loading = false;

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />
      {/* heading  */}
      <View style={{ marginBottom: 20, paddingTop: 80 }}>
        <Text style={formStyles.heading}>Categories</Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              name={item.name}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.container}>
        <TextInput
          {...inputOption}
          placeholder="New Category"
          value={category}
          onChangeText={setCategory}
        />
        <Button
          disabled={!category}
          onPress={() => submitHandler}
          textColor={colors.color2}
          loading={loading}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

const CategoryCard = ({ id, name, deleteHandler }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{name}</Text>
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Avatar.Icon
          size={50}
          style={{ backgroundColor: colors.color1 }}
          icon={"delete"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },
  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Categories;
