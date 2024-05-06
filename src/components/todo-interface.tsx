import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskInfo,
  moveChildDown,
  moveChildUp,
  removeChild,
  todoChild,
} from "../store/todo/todo-slice";
import { AppDispatch, RootState } from "../store";

type TodoInterfaceBarComponentProps = {
  child: todoChild;
  groupName: string;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  newTaskName: string;
  newTaskDescription: string;
  tIndex: number;
  isDescriptionToggled: boolean;
};

export const TodoInterfaceBarComponent = ({
  child,
  groupName,
  isEditMode,
  setIsEditMode,
  newTaskName,
  newTaskDescription,
  tIndex,
  isDescriptionToggled,
}: TodoInterfaceBarComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state).todo;
  const group = state.find((x) => x.name === groupName);
  if (!group) return null;
  const sort = group.sort[child.status];

  const handleClick = (
    type: "REMOVE" | "EDIT" | "MOVEUP" | "MOVEDOWN" | "CANCEL" | "SAVE"
  ) => {
    switch (type) {
      case "REMOVE":
        dispatch(
          removeChild({
            groupName,
            childId: child.id,
          })
        );
        break;
      case "EDIT":
        setIsEditMode(true);
        break;
      case "MOVEUP":
        dispatch(moveChildUp({ groupName, childId: child.id }));
        break;
      case "MOVEDOWN":
        dispatch(moveChildDown({ groupName, childId: child.id }));
        break;
      case "CANCEL":
        setIsEditMode(false);
        break;
      case "SAVE":
        dispatch(
          changeTaskInfo({
            groupName,
            childId: child.id,
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

  const disabledStyles = {
    backgroundColor: "var(--backgroundColor4)",
    cursor: "not-allowed",
  };

  return (
    <div className="todo-interface-bar">
      {!isEditMode ? (
        <>
          <div
            className="todo-button todo-remove-button disable-selection"
            onClick={() => handleClick("REMOVE")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("REMOVE");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex : -1}
          >
            Remove
          </div>
          <div
            className="todo-button todo-edit-button disable-selection"
            onClick={() => handleClick("EDIT")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("EDIT");
              }
            }}
            tabIndex={isDescriptionToggled ? tIndex + 1 : -1}
          >
            Edit
          </div>
          <div
            className="todo-button todo-moveup-button disable-selection"
            onClick={() => handleClick("MOVEUP")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("MOVEUP");
              }
            }}
            style={sort !== "random" ? disabledStyles : undefined}
            tabIndex={isDescriptionToggled ? tIndex + 2 : -1}
          >
            Up
          </div>
          <div
            className="todo-button todo-movedown-button disable-selection"
            onClick={() => handleClick("MOVEDOWN")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("MOVEDOWN");
              }
            }}
            style={sort !== "random" ? disabledStyles : undefined}
            tabIndex={isDescriptionToggled ? tIndex + 3 : -1}
          >
            Down
          </div>
        </>
      ) : (
        <>
          <div
            className="todo-button todo-save-button disable-selection"
            onClick={() => handleClick("SAVE")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("SAVE");
              }
            }}
            tabIndex={isEditMode ? tIndex + 1 : -1}
          >
            Save
          </div>
          <div
            className="todo-button todo-cancel-button disable-selection"
            onClick={() => handleClick("CANCEL")}
            role="button"
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleClick("CANCEL");
              }
            }}
            tabIndex={isEditMode ? tIndex + 2 : -1}
          >
            Cancel
          </div>
        </>
      )}
    </div>
  );
};
