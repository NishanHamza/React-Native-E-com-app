import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useMsgErrOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import { updateProduct } from "../../redux/actions/otherAction";

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);

  const { product, loading } = useSelector((state) => state.product);

  useSetCategories(setCategories, isFocused);

  const loadingOther = useMsgErrOther(dispatch, navigation, "admin");

  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setCategory(product.category?.category);
    setCategoryID(product.category?._id);
  }, [product]);

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
                  navigation.navigate("productimage", {
                    id,
                    images: product.images,
                  })
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
