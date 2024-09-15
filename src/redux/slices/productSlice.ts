import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Type/type";
import { fetchProducts } from "../../utils/api";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedBrands: string[];
  selectedModels: string[];
  searchQuery: string;
  selectedSort: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedBrands: [],
  selectedModels: [],
  searchQuery: "",
  selectedSort: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedBrands(state, action: PayloadAction<string[]>) {
      state.selectedBrands = action.payload;
    },
    setSelectedModels(state, action: PayloadAction<string[]>) {
      state.selectedModels = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedSort(state, action: PayloadAction<string>) {
      state.selectedSort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action?.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Something went wrong";
      });
  },
});

export const {
  setSelectedBrands,
  setSelectedModels,
  setSearchQuery,
  setSelectedSort,
} = productSlice.actions;

export const selectFilteredAndSortedProducts = (state: {
  products: ProductState;
}) => {
  const {
    products,
    selectedBrands,
    selectedModels,
    selectedSort,
    searchQuery,
  } = state.products;

  const filteredProducts = products?.filter((product) => {
    if (!product || typeof product?.name !== "string") return false;
    const productName = product?.name?.toLowerCase();

    return (
      (selectedBrands?.length === 0 ||
        selectedBrands?.includes(product?.brand)) &&
      (selectedModels?.length === 0 ||
        selectedModels?.includes(product?.model)) &&
      productName?.includes(searchQuery?.toLowerCase())
    );
  });

  return filteredProducts?.sort((a, b) => {
    switch (selectedSort) {
      case "Old to new":
        return (
          new Date(a?.createdAt)?.getTime() - new Date(b?.createdAt)?.getTime()
        );
      case "New to old":
        return (
          new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
        );
      case "Price high to low":
        return parseFloat(b?.price) - parseFloat(a?.price);
      case "Price low to high":
        return parseFloat(a?.price) - parseFloat(b?.price);
      case "A to Z":
        return a.name.localeCompare(b?.name);
      case "Z to A":
        return b.name.localeCompare(a?.name);
      default:
        return 0;
    }
  });
};

export default productSlice.reducer;
