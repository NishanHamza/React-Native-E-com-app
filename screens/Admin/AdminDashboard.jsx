import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formStyles } from "../../styles/styles";
import ButtonBox from "../../components/ButtonBox";
import Header from "../../components/Header";
import ProductListHeading from "../../components/ProductListHeading";
import { products } from "../Home";
import ProductListItem from "../../components/ProductListItem";
import Chart from "../../components/Chart";
import Loader from "../../components/Loader";

const AdminDashboard = ({ navigation }) => {
  const deleteHandler = (id) => {
    console.log(`Deleting Products with ID:${id}`);
  };
  const loading = false;
  const navigateHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;

      default:
        case "Category":
        navigation.navigate("categories")
        break;
    }
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ paddingTop: 80, marginBottom: 20 }}>
        <Text style={formStyles.heading}>Dashboard</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={12} outOfStock={2} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <ButtonBox
              text={"Product"}
              handler={navigateHandler}
              icon={"plus"}
            />
            <ButtonBox
              text={"All Orders"}
              handler={navigateHandler}
              icon={"format-list-bulleted-square"}
              reversed={true}
            />
            <ButtonBox
              text={"Category"}
              handler={navigateHandler}
              icon={"plus"}
            />
          </View>
          <ProductListHeading />
          <ScrollView showsVerticalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductListItem
                navigate={navigation}
                deleteHandler={deleteHandler}
                key={item._id}
                id={item._id}
                i={index}
                price={item.price}
                stock={item.stock}
                name={item.name}
                category={item.category}
                imgSrc={item.images[0].url}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminDashboard;
