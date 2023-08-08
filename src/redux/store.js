import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'; // Add this import
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { getProductReducer, getProductDetailsReducer } from './reducers/getProductReducer';
import { cartReducer } from './reducers/cartReducer';

// Combine all reducers
const rootReducer = combineReducers({
  getproducts: getProductReducer,
  getproductDetails: getProductDetailsReducer,
  cart: cartReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [thunk];

const store = createStore(
  persistedReducer, // Use the persisted reducer instead of the rootReducer
  composeWithDevTools(applyMiddleware(...middleWare))
);

const persistor = persistStore(store); // Create a persistor for the store

export { store, persistor };
