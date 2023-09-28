import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setNavbarScrollTop, toggleNavbar } from '../store/visual/visual-slice';
import {
  useChangeIndex,
  useGetGroupAmount,
  useWindowSize,
} from '../utils/hooks';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import './navbar-component.css';
import { addNewTodoGroup } from '../store/todo/todo-slice';

const NavbarComponent = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  const [width] = useWindowSize();
  const store = useSelector((store: RootState) => store);
  const changeIndex = useChangeIndex();

  const { navbarToggled: isNavbarToggled, navbarScrollTop } = store.visual;
  const todos = store.todo;

  const dispatch = useDispatch<AppDispatch>();

  //Toggle off the navbar if you resize the window to the pc version.
  useEffect(() => {
    if (width >= 992 && isNavbarToggled) {
      dispatch(toggleNavbar(false));
    }
    if (width <= 992 && !isNavbarToggled) {
      if (navbarRef.current)
        navbarRef.current.scrollTo({ top: navbarScrollTop });
    }
  }, [width]);

  //For scrolling the mobile version of the navbar
  useEffect(() => {
    if (isNavbarToggled || !navbarRef.current) return;
    console.log(navbarScrollTop);
    navbarRef.current.scrollTo({ top: navbarScrollTop });
  }, [isNavbarToggled, store.visual.navbarScrollTop]);

  const handleClick = (name: string) => {
    //Calculating the new scroll top for mobile.
    dispatch(setNavbarScrollTop({ groups: todos, groupName: name }));
    if (width >= 992) return;
    dispatch(toggleNavbar());
  };

  return (
    <div
      className={`navbar-component ${
        isNavbarToggled ? '' : 'navbar-bottom navbar-right'
      }`}
      ref={navbarRef}
    >
      <NavLink
        className="nav-button"
        to="/"
        onClick={() => handleClick('Home')}
        tabIndex={4}
      >
        Home
      </NavLink>
      {[...todos].map((todo) => {
        const tIndex = 101 + todos.indexOf(todo);
        return (
          <NavLink
            className="nav-button"
            key={todo.name}
            to={todo.name}
            tabIndex={tIndex}
            onClick={() => handleClick(todo.name)}
            onKeyUp={(e) =>
              changeIndex({
                event: e,
                groupName: todo.name,
              })
            }
          >
            {todo.name}
          </NavLink>
        );
      })}
      {todos.length < 15 && <NavbarCreateGroup />}
    </div>
  );
};

const NavbarCreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState('');
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const length = useGetGroupAmount();

  const dispatch = useDispatch<AppDispatch>();

  const submitNewTodo = () => {
    if (newGroupName === 'error' || newGroupName.trim() === '') {
      setIsError(true);
      return;
    }

    dispatch(addNewTodoGroup(newGroupName));
    if (!inputRef.current) return;

    setNewGroupName('');
  };

  const submitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter') return;
    submitNewTodo();
  };

  return (
    <div className="create-form">
      <input
        type="text"
        className="create-input"
        value={newGroupName}
        onChange={(e) => {
          setNewGroupName(e.target.value);
          isError && setIsError(false);
        }}
        ref={inputRef}
        placeholder="New to-do group"
        onKeyUp={(e) => submitByEnter(e)}
        tabIndex={150}
        style={{
          borderBottomColor: isError ? 'red' : 'white',
          outlineColor: isError ? 'red' : 'white',
        }}
      />
      <button
        type="button"
        className="create-button"
        onClick={submitNewTodo}
        tabIndex={151}
      >
        +
      </button>
    </div>
  );
};

export default NavbarComponent;
