import { Middleware } from "@reduxjs/toolkit";

export const saveThemeMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === "visual/changeTheme") {
      localStorage.setItem("theme", action.payload.theme);
    }

    next(action);
  };
