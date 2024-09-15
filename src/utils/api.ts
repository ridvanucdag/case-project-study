import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );
    return response.data;
  }
);
