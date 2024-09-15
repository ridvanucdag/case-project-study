import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import { Product } from "../../Type/type"; 

const mockStore = configureStore([]);

describe("Cart Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            product: {
              id: "1",
              name: "Test Product 1",
              price: "10.00",
              image: "",
              description: "",
              model: "",
              brand: "",
              createdAt: "",
            } as Product,
            quantity: 2,
          },
        ],
      },
    });
  });

  const renderWithStore = () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  };

  it("should display the cart title", () => {
    renderWithStore();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it("should display a message when the cart is empty", () => {
    store = mockStore({ cart: { items: [] } });
    renderWithStore();
    expect(screen.getByText(/Hemen alışverişe başlayın/i)).toBeInTheDocument();
  });

  it("should display the product name and price in the cart", () => {
    renderWithStore();
    expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/10,00/i)).toBeInTheDocument();
  });

  it("should increase the quantity of the product when the + button is clicked", () => {
    renderWithStore();
    const increaseButton = screen.getByLabelText(/Increase quantity/i);
    fireEvent.click(increaseButton);
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "cart/incrementQuantity",
      payload: "1",
    });
  });

  it("should decrease the quantity of the product when the - button is clicked", () => {
    renderWithStore();
    const decreaseButton = screen.getByLabelText(/Decrease quantity/i);
    fireEvent.click(decreaseButton);
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "cart/decrementQuantity",
      payload: "1",
    });
  });

  it("should remove the product from the cart if the quantity is reduced to zero", () => {
    renderWithStore();
    const decreaseButton = screen.getByLabelText(/Decrease quantity/i);
    fireEvent.click(decreaseButton);
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "cart/removeFromCart",
      payload: "1",
    });
  });

  it("should display the total price correctly", () => {
    renderWithStore();
    expect(screen.getByText(/Total Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/20,00/i)).toBeInTheDocument();
  });

  it("should handle checkout button click", () => {
    renderWithStore();
    const checkoutButton = screen.getByText(/Checkout/i);
    fireEvent.click(checkoutButton);
    expect(window.alert).toHaveBeenCalledWith("Proceeding to checkout!");
  });
});
