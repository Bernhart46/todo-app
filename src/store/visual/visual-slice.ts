import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  navbarToggled: false,
  isStateLoaded: false,
  theme: "",
};

export const visualSlice = createSlice({
  name: "visual",
  initialState,
  reducers: {
    toggleNavbar: (state, action: PayloadAction<boolean | undefined>) => {
      const toggled = action.payload;
      if (toggled !== undefined) {
        state.navbarToggled = toggled;
      } else {
        state.navbarToggled = !state.navbarToggled;
      }
    },
    setStateLoaded: (state) => {
      state.isStateLoaded = true;
    },
    changeTheme: (state, action: PayloadAction<{ theme: string }>) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
  },
});

export const { toggleNavbar, setStateLoaded, changeTheme } =
  visualSlice.actions;
export default visualSlice.reducer;
