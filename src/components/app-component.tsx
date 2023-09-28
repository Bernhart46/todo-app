import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../store';
import { useLoad, useSave } from '../utils/hooks';
import './app-component.css';
import MainComponent from './main-component';
import NavbarComponent from './navbar-component';

const AppComponent = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const state = useSelector((state: RootState) => state);

  const isNavbarToggled = state.visual.navbarToggled;
  const saveFunc = useSave();
  const loadFunc = useLoad();

  useEffect(() => {
    modifyVh();
    window.addEventListener('resize', () => {
      modifyVh();
    });

    loadFunc();
  }, []);

  useEffect(() => {
    saveFunc();
  }, [state.todo]);

  const modifyVh = () => {
    if (!appRef.current) return;
    const vh = window.innerHeight;
    appRef.current.style.setProperty('--vh', `${vh}px`);
  };
  return (
    <div
      className={`app-component ${isNavbarToggled ? '' : 'app-grid'}`}
      style={{ gridTemplateRows: isNavbarToggled ? '1fr' : '' }}
      ref={appRef}
    >
      <NavbarComponent />
      <MainComponent />
    </div>
  );
};

export default AppComponent;
