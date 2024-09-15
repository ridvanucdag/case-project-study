export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export interface Product {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
}

export interface Action<T = unknown> {
  type: string;
  payload?: T;
}

export type CartAction =
  | { type: typeof ADD_TO_CART; payload: CartItem }
  | { type: typeof REMOVE_FROM_CART; payload: string }
  | { type: typeof INCREMENT_QUANTITY; payload: string }
  | { type: typeof DECREMENT_QUANTITY; payload: string };

export type ProductAction = Action<Product[]>;
