import * as actionTypes from '../constants/cartConstants';

const initialState = {
  products: [],
};


export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case actionTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) =>
            product.id !== action.payload.productId
        ),
      };
    case actionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.FETCH_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
      };
    case actionTypes.INCREMENT_QUANTITY:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case actionTypes.DECREMENT_QUANTITY:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
            : item
        ),
      };
      case actionTypes.UPDATE_PRODUCT_IN_CART:
        const updatedProduct = action.payload; // The updated product with a new version
        const productIdToUpdate = updatedProduct.id; // Assuming 'id' is the unique identifier of the product
  
        // Find the index of the product to be updated in the 'products' array
        const productIndexToUpdate = state.products.findIndex(
          (product) => product.id === productIdToUpdate
        );
  
        if (productIndexToUpdate !== -1) {
          // If the product is found in the 'products' array, create a new copy of the cart
          // and replace the updated product in the appropriate index
          const updatedProducts = [...state.products];
          updatedProducts[productIndexToUpdate] = updatedProduct;
  
          console.log("🚀 ~ file: cartReducer.js done Product:", updatedProduct);
  
          // Return the new state with the updated product
          return {
            ...state,
            products: updatedProducts,
          };
        } else {
          // If the product is not found in the cart, you can choose to ignore the update or handle it differently
          console.log("Product with ID", productIdToUpdate, "not found in the cart.");
          return state;
        }
  
    default:
      return state;
  }
};
