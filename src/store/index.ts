import { configureStore } from "@reduxjs/toolkit";
import visualSlice from "./visual/visual-slice";
import todoSlice from "./todo/todo-slice";
import { saveThemeMiddleware } from "./middlewares";

export const store = configureStore({
  reducer: {
    visual: visualSlice,
    todo: todoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveThemeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
