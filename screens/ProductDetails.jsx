import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { colors, defaultStyle } from "../styles/styles";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";

SLIDER_WIDTH = Dimensions.get("window").width;
ITEM_WIDTH = SLIDER_WIDTH;

 export const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  console.log(params.id);

  const isCarousel = useRef(null);

  const [quantity, setQuantity] = useState(1);

  const price = 31500;
  const name = "Macbook Pro";
  const stock = 50;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar ligula eu nibh faucibus hendrerit. Proin ut fermentum nunc. Sed ullamcorper nulla sit amet purus pulvinar, nec eleifend lectus consectetur. Sed feugiat ipsum a blandit sollicitudin. Donec hendrerit, est ac dignissim fringilla, erat elit sollicitudin risus, vitae fringilla massa nulla ac felis. In luctus dolor eu lorem euismod iaculis. Nullam in dolor sit amet diam varius placerat. Donec placerat arcu nec sapien congue mattis. Aliquam eget malesuada arcu. In pharetra purus nec augue congue euismod. ";
  const images = [
    {
      id: "afsdfd",
      url: "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
    },
    {
      id: "afsdffafafad",
      url: "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
    },
  ];

  const incrementqty = () => {
    if (stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decrementqty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCarthandler =() => {
    if( stock ===0 ) return Toast.show({
      type: "error",
      text1: "Out of Stock!"
    }); 
    Toast.show({
      type:'success',
      text1: "Succesfully Added To The Cart!"
    })
  }

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />

      {/* Carousel */}

      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />

      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -420,
          borderTopRightRadius: 55,
          borderTopLeftRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          {price}$
        </Text>
        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
          numberOfLines={10}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: colors.color3,
              fontWeight: "100",
            }}
          >
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementqty}>
              <Avatar.Icon icon={"minus"} {...iconOptions} />
            </TouchableOpacity>
            <Text style={style.quantityStyle}>{quantity}</Text>
            <TouchableOpacity onPress={incrementqty}>
              <Avatar.Icon icon={"plus"} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={addToCarthandler}>
          <Button icon={"cart"} style={style.btn} textColor={colors.color2}>Add To Cart</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 80,
    height: 350,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 240,
  },
  quantityStyle: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});

export default ProductDetails;
