import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "./Header";
import store from "../../redux/store";

const renderWithStore = () =>
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

describe("Header Component", () => {
  it("renders header with title and cart icon", () => {
    renderWithStore();
    expect(screen.getByText("Eteration")).toBeInTheDocument();
  });

  it("opens search input when search icon is clicked", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Search"));
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("closes search input when clicking outside", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Search"));
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  it("opens filter modal when filter icon is clicked", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("opens cart modal when cart icon is clicked", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Cart"));
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});
