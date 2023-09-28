import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page';
import { HomePage } from '../pages/home-page';
import { TodoPage } from '../pages/todo-page';
import { RootState } from '../store';
import './main-component.css';

const MainComponent = () => {
  const isNavbarToggled = useSelector(
    (store: RootState) => store.visual.navbarToggled
  );

  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(
      () =>
        mainRef.current &&
        mainRef.current.scrollTo({
          top: mainRef.current.scrollHeight,
          behavior: 'smooth',
        }),
      20
    );
  };

  return (
    <main style={{ display: isNavbarToggled ? 'none' : 'block' }} ref={mainRef}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/:todo"
          element={<TodoPage scrollToBottom={scrollToBottom} />}
        />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </main>
  );
};

export default MainComponent;
