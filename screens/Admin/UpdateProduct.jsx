import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formStyles,
  inputOption,
  inputStyling,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";

const UpdateProduct = ({ navigation, route }) => {
  const loading = false;
  const loadingOther = false;

  const images = [
    {
      url: "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
      _id: "afsdgsdgsd",
    },
    {
      url: "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
      _id: "afsdgsdadfagsd",
    },
  ];

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([
    {
      _id: "sdffgd",
      category: "Laptop",
    },
    {
      _id: "sdETFfd",
      category: "Footwear",
    },
    {
      _id: "sdHHfd",
      category: "Cloths",
    },
  ]);
  const [visible, setVisible] = useState(false);

  const submitHandler = () => {
    console.log(name, description, price, stock, categoryID);
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        <Header back={true} />
        <View style={{ marginBottom: 20, paddingTop: 80 }}>
          <Text style={formStyles.heading}>Update Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              backgroundColor: colors.color3,
              padding: 20,
              elevation: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                height: 650,
              }}
            >
              <Button
                textColor={colors.color1}
                onPress={() =>
                  navigation.navigate("productimage", { id, images })
                }
              >
                Manage Images
              </Button>
              <TextInput
                {...inputOption}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                {...inputOption}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                {...inputOption}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                {...inputOption}
                placeholder="Stock"
                keyboardType="number-pad"
                value={stock}
                onChangeText={setStock}
              />
              <Text
                onPress={() => setVisible(true)}
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  borderRadius: 3,
                  textAlignVertical: "center",
                }}
              >
                {category}
              </Text>
              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  padding: 6,
                  margin: 20,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default UpdateProduct;
