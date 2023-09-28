import { configureStore } from '@reduxjs/toolkit';
import visualSlice from './visual/visual-slice';
import todoSlice from './todo/todo-slice';

export const store = configureStore({
  reducer: {
    visual: visualSlice,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
