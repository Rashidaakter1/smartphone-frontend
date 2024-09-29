import { createSlice } from "@reduxjs/toolkit";

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  model: string;
  operatingSystem: "iOS" | "Android" | "Other";
  storageCapacity: number; // in GB
  screenSize: number; // in inches
  cameraQuality: {
    main: number; // in megapixels
    front: number; // in megapixels
  };
  batteryCapacity: number; // in mAh
  additionalFeatures: {
    isWaterResistant: boolean;
    has5G: boolean;
    hasWirelessCharging: boolean;
  };
  isDeleted: boolean;
};

type TProductInitialState = {
  product: null | TProduct;
  token: null | string;
};

const initialState: TProductInitialState = {
  product: null,
  token: null,
};

export const productSlice = createSlice({
  name: "auth",
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
export const {  } = productSlice.actions;

export default productSlice.reducer;
