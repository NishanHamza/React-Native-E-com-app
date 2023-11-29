import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formStyles } from "../../styles/styles";
import ButtonBox from "../../components/ButtonBox";
import Header from "../../components/Header";
import ProductListHeading from "../../components/ProductListHeading";
import ProductListItem from "../../components/ProductListItem";
import Chart from "../../components/Chart";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useGetAdminProducts, useMsgErrOther } from "../../utils/hooks";
import { deleteProduct } from "../../redux/actions/otherAction";
import { getAdminProducts } from "../../redux/actions/productAction";

const AdminDashboard = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { loading, products, outOfStock, inStock } = useGetAdminProducts(
    dispatch,
    isFocused
  );
  useMsgErrOther(dispatch, null, null, getAdminProducts);
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

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
        navigation.navigate("categories");
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
            <Chart inStock={inStock} outOfStock={outOfStock} />
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
                category={item.category?.category}
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
