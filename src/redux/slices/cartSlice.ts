import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Type/type";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state?.items?.find(
        (item) => item?.product?.id === action?.payload?.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state?.items?.push({ product: action?.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state?.items.filter(
        (item) => item?.product?.id !== action?.payload
      );
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state?.items?.find(
        (item) => item?.product?.id === action?.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state?.items?.find(
        (item) => item?.product?.id === action?.payload
      );
      if (item && item?.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const selectCartTotal = (state: { cart: CartState }) =>
  state?.cart?.items?.reduce(
    (total, item) => total + parseFloat(item?.product?.price) * item?.quantity,
    0
  );

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
