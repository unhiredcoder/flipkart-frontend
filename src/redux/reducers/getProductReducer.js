import * as actionTypes from "../constants/productConstant"

const initialState = {
  products: [],
};

export const getProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      // case actionTypes.UPDATE_CART_WITH_LATEST_PRODUCTS:
      //   const latestProducts = action.payload;
      //   return {
      //     ...state,
      //     products: state.products.map((item) => {
      //       const updatedProduct = latestProducts.find((product) => product.productId === item.productId);
      //       return updatedProduct ? { ...item, product: updatedProduct } : item;
      //     }),
      //   };
      
    default:
      return state;
  }
};


export const getProductDetailsReducer = (state = { product: {}, loading: true }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_PRODUCTS_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};