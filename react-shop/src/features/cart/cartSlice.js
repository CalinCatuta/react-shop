import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (thunkApi) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue("There was an error...");
    }
  },
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      const findItem = state.cartItems.find((item) => item.id === payload.id);
      findItem.amount = findItem.amount + 1;
    },
    decrement: (state, { payload }) => {
      const findItem = state.cartItems.find((item) => item.id === payload.id);
      findItem.amount = findItem.amount - 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { increment, decrement, clearCart, removeItem, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
