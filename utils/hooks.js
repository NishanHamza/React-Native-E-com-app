import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { loadUser } from "../redux/actions/userAction";
import axios from "axios";
import { server } from "../redux/store";
import { getAdminProducts } from "../redux/actions/productAction";

export const useMsgErrUser = (navigation, dispatch, navigateTo) => {
  const { loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });

      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Toast.show({
        type: "success",
        text1: message,
      });

      dispatch({
        type: "clearMessage",
      });
      dispatch(loadUser());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMsgErrOther = (dispatch, navigation, navigateTo, func) => {
  const { loading, error, message } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });

      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });

      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useSetCategories = (setCategories, isFocused) => {
  useEffect(() => {
    axios
      .get(`${server}/product/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
      });
  }, [isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/order/${isAdmin ? "admin" : "my"}`)
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
        setLoading(false);
      });
  }, [isFocused]);
  return { loading, orders };
};

export const useGetOrderDetails = (isFocused, id) => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/order/single/${id}`)
      .then((res) => {
        setOrder(res.data.order);
        setLoading(false);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
        setLoading(false);
      });
  }, [isFocused]);
  return { loading, order };
};

export const useGetAdminProducts = (dispatch, isFocused) => {
  const { loading, products, outOfStock, inStock, error } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (error) {
      if (error === "Invalid category") {
      } else {
        Toast.show({
          type: "error",
          text1: error,
        });

        dispatch({
          type: "clearError",
        });
      }
    }

    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);
  return {
    loading,
    products,
    outOfStock,
    inStock,
  };
};
