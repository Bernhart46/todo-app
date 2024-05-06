import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toggleNavbar } from "../store/visual/visual-slice";
import {
  useChangeIndex,
  useGetGroupAmount,
  useWindowSize,
} from "../utils/hooks";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { NavLink } from "react-router-dom";
import "./navbar-component.css";
import { addNewTodoGroup } from "../store/todo/todo-slice";

const NavbarComponent = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  const pathname = decodeURI(window.location.pathname).replace("/", "");
  const param = pathname === "" ? "home" : pathname;

  const [width] = useWindowSize();
  const store = useSelector((store: RootState) => store);
  const changeIndex = useChangeIndex();

  const { navbarToggled: isNavbarToggled } = store.visual;
  const todos = store.todo;

  const nonTodoNames = ["home", "settings"];
  const isErrorPage =
    !todos.find((x) => x.name === param) && !nonTodoNames.includes(param);

  const buttonShowCondition = (name: string) => {
    if (width >= 992) return true;
    if (isNavbarToggled) return true;
    if (param === name) {
      return true;
    } else {
      false;
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  //Toggle off the navbar if you resize the window to the pc version.
  useEffect(() => {
    if (width >= 992 && isNavbarToggled) {
      dispatch(toggleNavbar(false));
    }
  }, [width]);
  const handleClick = () => {
    if (width >= 992) return;
    dispatch(toggleNavbar());
  };

  const showButtons =
    width >= 992 ||
    isNavbarToggled ||
    (!nonTodoNames.includes(param) && !isNavbarToggled);

  return (
    <div
      className={`navbar-component ${
        isNavbarToggled ? "" : "navbar-bottom navbar-right"
      }`}
    >
      {(buttonShowCondition("home") || isErrorPage) && (
        <NavLink
          className="nav-button"
          to="/"
          onClick={handleClick}
          tabIndex={100}
        >
          Home
        </NavLink>
      )}
      {showButtons && (
        <div
          className="nav-button__container"
          ref={navbarRef}
          style={{
            overflowY: `${isNavbarToggled || width >= 992 ? "auto" : "hidden"}`,
          }}
        >
          {[...todos].map((todo, i) => {
            const tIndex = 101 + i;
            const show = buttonShowCondition(todo.name);
            return (
              show && (
                <NavLink
                  className="nav-button"
                  key={todo.name}
                  to={todo.name}
                  title={todo.name}
                  tabIndex={tIndex}
                  onClick={handleClick}
                  onKeyUp={(e) =>
                    changeIndex({
                      event: e,
                      groupName: todo.name,
                    })
                  }
                >
                  {todo.name}
                </NavLink>
              )
            );
          })}
        </div>
      )}
      {(isNavbarToggled || width >= 992) && <NavbarCreateGroup />}

      {buttonShowCondition("settings") && (
        <NavLink
          className="nav-button settings-button"
          to="/settings"
          onClick={handleClick}
          tabIndex={101 + todos.length + 1}
        >
          Settings
        </NavLink>
      )}
    </div>
  );
};

const NavbarCreateGroup = () => {
  const [newGroupName, setNewGroupName] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const groupAmount = useGetGroupAmount();

  const dispatch = useDispatch<AppDispatch>();

  const submitNewTodo = () => {
    const badNames = ["error", "home", "settings"];
    if (
      badNames.includes(newGroupName.toLowerCase()) ||
      newGroupName.trim() === ""
    ) {
      setIsError(true);
      return;
    }

    dispatch(addNewTodoGroup(newGroupName));
    if (!inputRef.current) return;

    setNewGroupName("");
  };

  const submitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;
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
        tabIndex={101 + groupAmount}
        style={{
          borderBottomColor: isError ? "red" : "var(--color)",
          outlineColor: isError ? "red" : "var(--color)",
        }}
      />
      <button
        type="button"
        className="create-button"
        onClick={submitNewTodo}
        tabIndex={101 + groupAmount + 1}
      >
        +
      </button>
    </div>
  );
};

export default NavbarComponent;
