import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../store";
import { useLoad, useSave } from "../utils/hooks";
import "./app-component.css";
import "../utils/themes.css";
import MainComponent from "./main-component";
import NavbarComponent from "./navbar-component";
import { changeTheme } from "../store/visual/visual-slice";

const AppComponent = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const isNavbarToggled = state.visual.navbarToggled;
  const saveFunc = useSave();
  const loadFunc = useLoad();

  const theme = state.visual.theme;
  const localTheme = localStorage.getItem("theme");

  useEffect(() => {
    modifyVh();
    window.addEventListener("resize", () => {
      modifyVh();
    });

    loadFunc();
    dispatch(changeTheme({ theme: localTheme ? localTheme : "dark" }));
  }, []);

  useEffect(() => {
    saveFunc();
  }, [state.todo]);

  const modifyVh = () => {
    if (!appRef.current) return;
    const vh = window.innerHeight;
    appRef.current.style.setProperty("--vh", `${vh}px`);
  };
  return (
    <div
      className={`app-component ${
        isNavbarToggled ? "" : "app-grid"
      } ${theme}-theme `}
      style={{
        gridTemplateRows: isNavbarToggled ? "1fr" : "",
      }}
      ref={appRef}
    >
      <NavbarComponent />
      <MainComponent />
    </div>
  );
};

export default AppComponent;
