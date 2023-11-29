import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formStyles,
  inputOption,
  inputStyling,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useMsgErrOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/otherAction";
import mime from "mime";

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Select a Category");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("stock", stock);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
    if (categoryID) myForm.append("category", categoryID);

    dispatch(createProduct(myForm));
  };

  const disabeBtn = !name || !description || !price || !stock || !image;

  const loading = useMsgErrOther(dispatch, navigation, "admin");

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
    }
  }, [route.params]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        <Header back={true} />
        <View style={{ marginBottom: 20, paddingTop: 80 }}>
          <Text style={formStyles.heading}>New Product</Text>
        </View>

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
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: colors.color1,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { newProduct: true })
                }
              >
                <Avatar.Icon
                  icon={"camera"}
                  size={30}
                  color={colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                    position: "absolute",
                    bottom: 0,
                    right: -5,
                  }}
                />
              </TouchableOpacity>
            </View>

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
              loading={loading}
              disabled={disabeBtn}
            >
              Create Product
            </Button>
          </View>
        </ScrollView>
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

export default NewProduct;
