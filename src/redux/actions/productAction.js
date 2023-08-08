import axios from 'axios';
import * as actionTypes from "../constants/productConstant"

import { URL } from '../../constants/data';



export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);
    dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: data });
    dispatch({ type: actionTypes.UPDATE_PRODUCT_IN_CART, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.FETCH_PRODUCTS_FAILURE, payload: error.message });
    throw error; // Rethrow the error to be handled in the frontend
  }
};



export const getProductDetails = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/product/detail/${productId}`);
    dispatch({ type: actionTypes.FETCH_PRODUCTS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_DETAILS_FAILURE, payload: error.message });
  }
};