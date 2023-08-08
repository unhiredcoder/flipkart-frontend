export const UPDATE_CART = 'UPDATE_CART';
import axios from 'axios';
import * as actionTypes from '../constants/cartConstants';

import { URL } from "../../constants/data.js"





export const addItemsToCart = (productId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/cart/${productId}`);
    console.log("getttig pid", productId);
    const cartItem = { ...data, userId }; // Attach userId to the product data
    console.log("sending to reducer", cartItem);
    dispatch({ type: actionTypes.ADD_TO_CART_SUCCESS, payload: cartItem });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_TO_CART_FAILURE, payload: error.message });
  }
};


// actions/cartActions.js

export const updateProductInCart = (updatedProduct) => (dispatch) => {
  console.log("🚀 ~ file: cartActions.js:27 ~ in action ~ updatedProduct:", updatedProduct)
  dispatch({
    type: actionTypes.UPDATE_PRODUCT_IN_CART,
    payload: updatedProduct,
  });
};



export const saveCartToBackend = (userId, cartData) => async (dispatch) => {
  try {
    console.log("recevign in action", cartData);
    // Make an API call to your backend with the updated cart data
    const response = await axios.post(`${URL}/api/savecart/${userId}`, cartData);
    console.log('Cart data saved successfully:', response.data);
    // Handle any success actions or notifications
  } catch (error) {
    console.error('Error saving cart data front:', error);
    // Handle error scenarios
  }
};


export const fetchCartData = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/api/getcart/${userId}`);
    const productsArray = response.data;
    // Dispatch an action with the retrieved productsArray to update the Redux store
    dispatch({ type: actionTypes.FETCH_CART_SUCCESS, payload: productsArray });
  } catch (error) {
    // Handle error (dispatch an error action or show an error message)
    dispatch({ type: actionTypes.FETCH_CART_FAILURE, payload: error.message });
  }
};

export const removeFromCart = (productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      productId: productId,
    },
  };
};

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});

export const incrementQuantity = (itemId) => ({
  type: actionTypes.INCREMENT_QUANTITY,
  payload: itemId,
});

export const decrementQuantity = (itemId) => ({
  type: actionTypes.DECREMENT_QUANTITY,
  payload: itemId,
});








