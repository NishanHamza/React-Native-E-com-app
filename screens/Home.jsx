import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";


export const products = [
  {
    price: 31,
    name: "Sample",
    stock: 20,
    category: "Laptop",
    _id: "sadadfff",
    images: [
      {
        url: "https://www.pngitem.com/pimgs/m/433-4336756_shoes-png-transparent-images-pair-of-shoes-png.png",
      },
    ],
  },
  {
    price: 312,
    name: "Sample2",
    stock: 20,
    category: "IDK",
    _id: "sadadsafsdffff",
    images: [
      {
        url: "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1920",
      },
    ],
  },
  {
    price: 54,
    name: "Sample3",
    stock: 20,
    category: "Shoe",
    _id: "sadadffgggff",
    images: [
      {
        url: "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1920",
      },
    ],
  },
];

const categories = [
  { category: "ehhe1", _id: "sdff" },
  { category: "ehhe2", _id: "sdffad" },
  { category: "ehhe3", _id: "sdfffagg" },
  { category: "ehhe4", _id: "sdfsddfad" },
  { category: "ehhe5", _id: "sdffffgad" },
  { category: "ehhe6", _id: "sdffghhedad" },
];


const Home = () => {
 

  const [category, setCategory] = useState();

  const categoriesHandler = (id) => {
    setCategory(id);
  };

  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCardHandler = (id) => {
    console.log("add to cart", id);
  };

  const navigate = useNavigation();

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}
          setActiveSearch={setActiveSearch}
        />
      )}
      <View style={defaultStyle}>
        <Header />

        {/* heading row */}

        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* headings */}

          <Heading text1={"Our"} text2={"Products"} />

          {/* search-bar */}

          <View>
            <TouchableOpacity
              onPress={() => {
                setActiveSearch(!activeSearch);
              }}
            >
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color={"gray"}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}

        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category == item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoriesHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category == item._id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* products */}

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;
