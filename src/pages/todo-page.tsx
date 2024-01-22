import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TodoComponent } from "../components/todo-component";
import { TodoCreationComponent } from "../components/todo-creation";
import { AppDispatch, RootState } from "../store";
import { setNavbarScrollTop } from "../store/visual/visual-slice";
import HRLine from "../components/hr-line";

import "./todo-page.css";

export const TodoPage = ({
  scrollToBottom,
}: {
  scrollToBottom: () => void;
}) => {
  const { todo } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
    ? group.children.filter((child) => child.status === "NOT_STARTED")
    : [];
  const inProgress = group
    ? group.children.filter((child) => child.status === "IN_PROGRESS")
    : [];
  const done = group
    ? group.children.filter((child) => child.status === "DONE")
    : [];

  return (
    <>
      <h1 className="center-text disable-selection">{group?.name}</h1>
      <div className="todo-list">
        <HRLine name="Not Started" />
        {group &&
          notStartedTodos.map((child) => {
            return <TodoComponent key={child.id} group={group} child={child} />;
          })}
        <HRLine name="In Progress" />
        {group &&
          inProgress.map((child) => {
            return <TodoComponent key={child.id} group={group} child={child} />;
          })}
        <HRLine name="Finished" />
        {group &&
          done.map((child) => {
            return <TodoComponent key={child.id} group={group} child={child} />;
          })}
        {group && (
          <TodoCreationComponent
            groupName={group.name}
            scrollToBottom={scrollToBottom}
          />
        )}
      </div>
    </>
  );
};
