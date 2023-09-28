import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  todoGroup,
  todoChild,
  removeChild,
  moveChildUp,
  moveChildDown,
  changeStatus,
  changeTaskInfo,
} from "../store/todo/todo-slice";
import { useChangeIndex } from "../utils/hooks";

type TodoComponentProps = {
  group: todoGroup;
  child: todoChild;
};

export const TodoComponent = ({ group, child }: TodoComponentProps) => {
  const { name: childName, status: childStatus, description } = child;
  const [isDescriptionToggled, setIsDescriptionToggled] = useState(false);

  //EDIT states
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTaskName, setNewTaskName] = useState(childName);
  const [newTaskDescription, setNewTaskDescription] = useState(description);
  const newNameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const changeIndex = useChangeIndex();

  useEffect(() => {
    if (!isEditMode) return;
    if (!newNameRef.current) return;
    newNameRef.current.focus();
  }, [isEditMode]);

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
      changeIndex({ event: e, groupName: group.name, childName });
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

  const onChangeStatus = () => {
    dispatch(changeStatus({ groupName: group.name, childName: child.name }));
  };

  const tIndex = 201 + 10 * group.children.indexOf(child);

  return (
    <>
      <div className="todo-item">
        <div
          className="todo-status"
          onClick={onChangeStatus}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              onChangeStatus();
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
          <input
            type="text"
            className="new-name-input"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            tabIndex={isEditMode ? tIndex + 6 : -1}
            ref={newNameRef}
          />
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
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            tabIndex={isEditMode ? tIndex + 7 : -1}
          ></textarea>
        )}

        {/* Looks bad I know */}
        <TodoInterfaceBarComponent
          child={child}
          group={group}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          newTaskName={newTaskName}
          newTaskDescription={newTaskDescription}
          tIndex={tIndex}
          isDescriptionToggled={isDescriptionToggled}
        />
      </div>
    </>
  );
};

type TodoInterfaceBarComponentProps = {
  child: todoChild;
  group: todoGroup;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  newTaskName: string;
  newTaskDescription: string;
  tIndex: number;
  isDescriptionToggled: boolean;
};

const TodoInterfaceBarComponent = ({
  child,
  group,
  isEditMode,
  setIsEditMode,
  newTaskName,
  newTaskDescription,
  tIndex,
  isDescriptionToggled,
}: TodoInterfaceBarComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (
    type: "REMOVE" | "EDIT" | "MOVEUP" | "MOVEDOWN" | "CANCEL" | "SAVE"
  ) => {
    switch (type) {
      case "REMOVE":
        dispatch(
          removeChild({
            groupName: group.name,
            childIndex: group.children.indexOf(child),
          })
        );
        break;
      case "EDIT":
        setIsEditMode(true);
        break;
      case "MOVEUP":
        dispatch(moveChildUp({ groupName: group.name, childName: child.name }));
        break;
      case "MOVEDOWN":
        dispatch(
          moveChildDown({ groupName: group.name, childName: child.name })
        );
        break;
      case "CANCEL":
        setIsEditMode(false);
        break;
      case "SAVE":
        dispatch(
          changeTaskInfo({
            groupName: group.name,
            childName: child.name,
            newName: newTaskName,
            newDescription: newTaskDescription,
          })
        );
        setIsEditMode(false);
        break;
      default:
        console.log("DEFAULT");
    }
  };

  return (
    <div className="todo-interface-bar">
      {!isEditMode ? (
        <>
          <div
            className="todo-button todo-remove-button"
            onClick={() => handleClick("REMOVE")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("REMOVE");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex + 2 : -1}
          >
            Remove
          </div>
          <div
            className="todo-button todo-edit-button"
            onClick={() => handleClick("EDIT")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("EDIT");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex + 3 : -1}
          >
            Edit
          </div>
          <div
            className="todo-button todo-moveup-button"
            onClick={() => handleClick("MOVEUP")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("MOVEUP");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex + 4 : -1}
          >
            Up
          </div>
          <div
            className="todo-button todo-movedown-button"
            onClick={() => handleClick("MOVEDOWN")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("MOVEDOWN");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex + 5 : -1}
          >
            Down
          </div>
        </>
      ) : (
        <>
          <div
            className="todo-button todo-save-button"
            onClick={() => handleClick("SAVE")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("SAVE");
              }
            }}
            tabIndex={isEditMode ? tIndex + 8 : -1}
          >
            Save
          </div>
          <div
            className="todo-button todo-cancel-button"
            onClick={() => handleClick("CANCEL")}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("CANCEL");
              }
            }}
            tabIndex={isEditMode ? tIndex + 9 : -1}
          >
            Cancel
          </div>
        </>
      )}
    </div>
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
