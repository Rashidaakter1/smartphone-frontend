import { createSlice } from "@reduxjs/toolkit";

export type TSalesManagement = {
  product: string;
  stock: number;
  buyerDetails: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
  dateOfSale: Date;
  isDeleted: boolean;
  salesHistory: TSalesManagement[];
};


type TSalesInitialState = {
  product: null | TSalesManagement;
  token: null | string;
};

const initialState: TSalesInitialState = {
  product: null,
  token: null,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    // },
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {} = salesSlice.actions;

export default salesSlice.reducer;
