import { configureStore } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localstorage';
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';

const loadCartState = loadFromLocalStorage("cart");


const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice,
    },
    preloadedState: {
      cart: loadCartState || { items: [] },
    }
});

store.subscribe(() => {
  saveToLocalStorage("cart", store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
