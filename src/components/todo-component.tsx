import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  todoGroup,
  todoChild,
  removeChild,
  changeStatus,
} from "../store/todo/todo-slice";
import { useChangeIndex } from "../utils/hooks";
import { calcNewHeight } from "../utils/functions";
import "./todo-component.css";
import { TodoInterfaceBarComponent } from "./todo-interface";

type TodoComponentProps = {
  group: todoGroup;
  child: todoChild;
};

export const TodoComponent = ({ group, child }: TodoComponentProps) => {
  const { name: childName, status: childStatus, description } = child;
  const [isDescriptionToggled, setIsDescriptionToggled] = useState(false);

  //EDIT states
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(childName);
  const [newTaskDescription, setNewTaskDescription] = useState(description);
  const newNameRef = useRef<HTMLTextAreaElement>(null);
  const newDescRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const changeIndex = useChangeIndex();

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
      changeIndex({ event: e, groupName: group.name, childId: child.id });
    }

    if (e.code === "Enter") {
      toggleDescription();
    }

    if (e.code === "Delete") {
      dispatch(
        removeChild({
          groupName: group.name,
          childIndex: group.children.indexOf(child),
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
    dispatch(
      changeStatus({ groupName: group.name, childId: child.id, direction })
    );
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

  const tIndex = 201 + 10 * group.children.indexOf(child);

  return (
    <>
      <div className="todo-item">
        <div
          className="todo-status"
          onClick={() => onChangeStatus("next")}
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
          tabIndex={tIndex + 1}
        ></div>
        {!isEditMode ? (
          <div
            className="todo-name disable-selection"
            onKeyUp={(e) => handleKeyUp(e)}
            tabIndex={tIndex}
            onClick={toggleDescription}
          >
            {childName}
          </div>
        ) : (
          <textarea
            className="new-name-input"
            value={newTaskTitle}
            onChange={(e) => handleNewDataChange(e, "name")}
            tabIndex={isEditMode ? tIndex + 6 : -1}
            ref={newNameRef}
          ></textarea>
        )}
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
            tabIndex={isEditMode ? tIndex + 7 : -1}
          ></textarea>
        )}

        {/* Looks bad I know */}
        <TodoInterfaceBarComponent
          child={child}
          group={group}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          newTaskName={newTaskTitle}
          newTaskDescription={newTaskDescription}
          tIndex={tIndex}
          isDescriptionToggled={isDescriptionToggled}
        />
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
