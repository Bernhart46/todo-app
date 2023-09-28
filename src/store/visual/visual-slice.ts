import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoGroup } from '../todo/todo-slice';

const initialState = {
  navbarToggled: false,
  navbarScrollTop: 0,
  isStateLoaded: false,
};

export const visualSlice = createSlice({
  name: 'visual',
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
    setNavbarScrollTop: (
      state,
      action: PayloadAction<{
        groups?: todoGroup[];
        groupName?: string;
        number?: number;
      }>
    ) => {
      const { groups, groupName, number } = action.payload;
      if (number !== undefined) {
        state.navbarScrollTop = number;
        return;
      }
      if (!groupName || !groups) return;
      const index = groups.findIndex((x) => x.name === groupName);
      let newIndex = 0;
      if (index !== undefined && index >= 0) newIndex += index + 1;
      if (index === undefined) newIndex = 0;
      const newTop = newIndex * 40;

      state.navbarScrollTop = newTop;
    },
    setStateLoaded: (state) => {
      state.isStateLoaded = true;
    },
  },
});

export const { toggleNavbar, setNavbarScrollTop, setStateLoaded } =
  visualSlice.actions;
export default visualSlice.reducer;
