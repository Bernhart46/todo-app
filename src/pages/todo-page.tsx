import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TodoComponent } from "../components/todo-component";
import { AppDispatch, RootState } from "../store";
import { setNavbarScrollTop } from "../store/visual/visual-slice";
import HRLine from "../components/hr-line";
import { useGetGroupAmount } from "../utils/hooks";

import "./todo-page.css";
import { GroupFunctionsComponent } from "../components/group-functions/group-functions";

type TodoPageProps = {
  scrollToBottom: () => void;
};

export type FocusedTodo = {
  id: number;
  isOpen: boolean;
};

export const TodoPage = ({ scrollToBottom }: TodoPageProps) => {
  const { todo } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const groupAmount = useGetGroupAmount();
  const [focusedTodo, setFocusedTodo] = useState<null | FocusedTodo>(null);

  const state = useSelector((state: RootState) => state);

  const group = state.todo.find((el) => el.name === todo);

  useEffect(() => {
    if (!group && state.visual.isStateLoaded) {
      navigate(`/error?page=${todo}`);
      return;
    }
    if (window.innerWidth <= 992 && group) {
      dispatch(
        setNavbarScrollTop({ groups: state.todo, groupName: group.name })
      );
    }
  }, [todo, group, state.visual.isStateLoaded]);
  const notStartedTodos = group
    ? group.children
        .filter((child) => child.status === "NOT_STARTED")
        .sort((a, b) => a.index - b.index)
    : [];
  const inProgress = group
    ? group.children
        .filter((child) => child.status === "IN_PROGRESS")
        .sort((a, b) => a.index - b.index)
    : [];
  const done = group
    ? group.children
        .filter((child) => child.status === "DONE")
        .sort((a, b) => a.index - b.index)
    : [];
  //base tabIndexes for status groups
  //101 = base, 2 = new group
  const nst_baseIndex = 101 + groupAmount + 2 + 1;
  const ip_baseIndex = nst_baseIndex + notStartedTodos.length * 6;
  const done_baseIndex = ip_baseIndex + inProgress.length * 6;

  return (
    <>
      <h1 className="center-text disable-selection">{group?.name}</h1>
      <div className="todo-list">
        <HRLine name="Not Started" />
        {group &&
          notStartedTodos.map((child, i) => {
            const tIndex = nst_baseIndex + i * 6;
            return (
              <TodoComponent
                key={child.id}
                groupName={group.name}
                child={child}
                focusedTodo={focusedTodo}
                setFocusedTodo={setFocusedTodo}
                baseIndex={tIndex}
                normalIndex={i}
              />
            );
          })}
        <HRLine name="In Progress" />
        {group &&
          inProgress.map((child, i) => {
            const tIndex = ip_baseIndex + i * 6;
            return (
              <TodoComponent
                key={child.id}
                groupName={group.name}
                child={child}
                focusedTodo={focusedTodo}
                setFocusedTodo={setFocusedTodo}
                baseIndex={tIndex}
                normalIndex={i}
              />
            );
          })}
        <HRLine name="Finished" />
        {group &&
          done.map((child, i) => {
            const tIndex = done_baseIndex + i * 6;
            return (
              <TodoComponent
                key={child.id}
                groupName={group.name}
                child={child}
                focusedTodo={focusedTodo}
                setFocusedTodo={setFocusedTodo}
                baseIndex={tIndex}
                normalIndex={i}
              />
            );
          })}
        <br />
        <HRLine name="Functions" />
        {group && <GroupFunctionsComponent scrollToBottom={scrollToBottom} />}
      </div>
    </>
  );
};
