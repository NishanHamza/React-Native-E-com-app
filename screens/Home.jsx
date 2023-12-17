import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { useServerStatus, useSetCategories } from "../utils/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AppStart from "../components/AppStart";

const Home = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigation();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products, loading } = useSelector((state) => state.product);

  const categoriesHandler = (id) => {
    if (category === id) {
      setCategory("");
    } else {
      setCategory(id);
    }
  };

  const addToCartHandler = (product, name, price, stock, image, quantity) => {
    if (stock == 0) {
      Toast.show({
        type: "error",
        text1: "Out of Stock!",
      });
    } else {
      dispatch({
        type: "addToCart",
        payload: { product, name, price, stock, image, quantity },
      });
      Toast.show({
        type: "success",
        text1: "Succesfully Added To The Cart!",
      });
    }
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 0);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  const { status } = useServerStatus(isFocused);

  return (
    <>
      {status !== "Working" && <AppStart />}
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
                setCategory("");
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
          <ScrollView overScrollMode="never" horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCartHandler={addToCartHandler}
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
