import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formStyles } from "../../styles/styles";
import Header from "../../components/Header";
import ImageCard from "../../components/ImageCard";
import { Avatar, Button } from "react-native-paper";

const ProductImage = ({ navigation, route }) => {
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);

  const [image, setImage] = useState();
  const [imageChanged, setImageChanged] = useState();
  const loading = false;

  const deleteHandler = (id) => {
    console.log("image Id", id);
    console.log("Product Id", productId);
  };

  const submitHandler = () => {};

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
    }
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formStyles.heading}>Images</Text>
      </View>
      <ScrollView
        style={{
          margin: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 40,
            minHeight: 400,
          }}
        >
          {images.map((i) => (
            <ImageCard
              src={i.url}
              key={i._id}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: colors.color3,
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Image
          style={{
            backgroundColor: colors.color2,
            height: 100,
            width: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("camera", { updateProduct: true })
            }
          >
            <Avatar.Icon
              icon={"camera"}
              size={40}
              color={colors.color3}
              style={{
                backgroundColor: colors.color2,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            padding: 6,
          }}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default ProductImage;
