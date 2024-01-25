import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  todoChild,
  removeChild,
  changeStatus,
  setNewChildIndex,
} from "../store/todo/todo-slice";
import { useChangeIndex } from "../utils/hooks";
import { calcNewHeight } from "../utils/functions";
import "./todo-component.css";
import { TodoInterfaceBarComponent } from "./todo-interface";
import { FocusedTodo } from "../pages/todo-page";

type TodoComponentProps = {
  groupName: string;
  child: todoChild;
  focusedTodo: FocusedTodo | null;
  setFocusedTodo: React.Dispatch<React.SetStateAction<null | FocusedTodo>>;
  baseIndex: number;
  normalIndex: number;
};

export const TodoComponent = ({
  groupName,
  child,
  focusedTodo,
  setFocusedTodo,
  baseIndex,
  normalIndex,
}: TodoComponentProps) => {
  const { name: childName, status: childStatus, description } = child;
  const [isDescriptionToggled, setIsDescriptionToggled] = useState(false);

  //EDIT states
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(childName);
  const [newTaskDescription, setNewTaskDescription] = useState(description);
  const newNameRef = useRef<HTMLTextAreaElement>(null);
  const newDescRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const changeIndex = useChangeIndex();

  useEffect(() => {
    dispatch(
      setNewChildIndex({
        groupName,
        childId: child.id,
        newIndex: normalIndex,
      })
    );
  }, [normalIndex]);

  useEffect(() => {
    if (focusedTodo?.id === child.id) {
      statusRef?.current?.focus();
      setIsDescriptionToggled(!!focusedTodo?.isOpen);
    }
  }, [focusedTodo]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!newNameRef.current || !newDescRef.current) return;
    newNameRef.current.focus();
    newNameRef.current.style.height =
      calcNewHeight(newNameRef.current.value) + "px";
    newDescRef.current.style.height =
      calcNewHeight(newDescRef.current.value) + "px";
  }, [isEditMode]);

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      changeIndex({ event: e, groupName, childId: child.id });
    }

    if (e.code === "Enter") {
      toggleDescription();
    }

    if (e.code === "Delete") {
      dispatch(
        removeChild({
          groupName,
          childId: child.id,
        })
      );
    }
  };

  const toggleDescription = () => {
    if (isDescriptionToggled) {
      setIsDescriptionToggled(false);
      setIsEditMode(false);
    } else {
      setIsDescriptionToggled(true);
    }
  };

  const onChangeStatus = (direction: "next" | "prev") => {
    dispatch(changeStatus({ groupName, childId: child.id, direction }));
    setFocusedTodo({
      id: child.id,
      isOpen: isDescriptionToggled,
    });
  };

  const handleNewDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "name" | "description"
  ) => {
    const MAX_LINES = type === "name" ? 5 : 10;
    const value = e.target.value;
    const lineArray = e.target.value.split("\n");
    const isMaxLines = lineArray.length > MAX_LINES;

    if (type === "name") {
      if (isMaxLines) return;
      setNewTaskTitle(value);
    }
    if (type === "description") {
      if (isMaxLines) return;
      setNewTaskDescription(value);
    }

    e.target.style.height = calcNewHeight(value) + "px";
  };

  return (
    <>
      <div className="todo-item">
        <div
          className="todo-status"
          onClick={() => onChangeStatus("next")}
          ref={statusRef}
          onContextMenu={(e) => {
            e.preventDefault();
            onChangeStatus("prev");
          }}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              if (e.shiftKey) {
                onChangeStatus("prev");
              } else {
                onChangeStatus("next");
              }
            }
          }}
          style={{ backgroundColor: getColorByStatus(childStatus) }}
          tabIndex={baseIndex}
        ></div>
        {/* tabIndex={tIndex + 1} */}
        {!isEditMode ? (
          <div
            className="todo-name disable-selection"
            onKeyUp={(e) => handleKeyUp(e)}
            onClick={toggleDescription}
            tabIndex={baseIndex + 1}
          >
            {/* tabIndex={tIndex} */}
            {childName}
          </div>
        ) : (
          <textarea
            className="new-name-input"
            value={newTaskTitle}
            onChange={(e) => handleNewDataChange(e, "name")}
            ref={newNameRef}
            tabIndex={isEditMode ? baseIndex + 1 : -1}
          ></textarea>
        )}
        {/* tabIndex={isEditMode ? tIndex + 6 : -1} */}
        <div
          className="todo-toggle-arrow disable-selection"
          onClick={toggleDescription}
        >
          {isDescriptionToggled ? "ᐯ" : "❮"}
        </div>
      </div>
      <div
        className={`todo-description ${
          isDescriptionToggled ? "todo-description-open" : ""
        }`}
      >
        {!isEditMode ? (
          <div className="todo-description-text">{description}</div>
        ) : (
          <textarea
            className="new-description-input"
            ref={newDescRef}
            value={newTaskDescription}
            onChange={(e) => handleNewDataChange(e, "description")}
            tabIndex={isEditMode ? baseIndex + 2 : -1}
          ></textarea>
        )}
        {/* tabIndex={isEditMode ? tIndex + 7 : -1} */}

        {/* Looks bad I know */}
        <TodoInterfaceBarComponent
          child={child}
          groupName={groupName}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          newTaskName={newTaskTitle}
          newTaskDescription={newTaskDescription}
          isDescriptionToggled={isDescriptionToggled}
          tIndex={baseIndex + 2}
        />
        {/* tIndex={tIndex} */}
      </div>
    </>
  );
};

const getColorByStatus = (status: "NOT_STARTED" | "IN_PROGRESS" | "DONE") => {
  if (status === "NOT_STARTED") {
    return "azure";
  }

  if (status === "IN_PROGRESS") {
    return "orange";
  }

  if (status === "DONE") {
    return "ForestGreen";
  }
};
