import {
  ADD_TO_CART,
  CartItem,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../../Type/type";

export const addToCart = (item: CartItem) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id: string) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const incrementQuantity = (id: string) => ({
  type: INCREMENT_QUANTITY,
  payload: id,
});

export const decrementQuantity = (id: string) => ({
  type: DECREMENT_QUANTITY,
  payload: id,
});
