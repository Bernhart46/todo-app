import { useDispatch } from "react-redux";
import {
  changeTaskInfo,
  moveChildDown,
  moveChildUp,
  removeChild,
  todoChild,
} from "../store/todo/todo-slice";
import { AppDispatch } from "../store";

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
            tabIndex={isDescriptionToggled ? tIndex : -1}
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
            tabIndex={isDescriptionToggled ? tIndex + 1 : -1}
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
            tabIndex={isDescriptionToggled ? tIndex + 2 : -1}
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
            tabIndex={isDescriptionToggled ? tIndex + 3 : -1}
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
            tabIndex={isEditMode ? tIndex + 1 : -1}
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
            tabIndex={isEditMode ? tIndex + 2 : -1}
          >
            Cancel
          </div>
        </>
      )}
    </div>
  );
};
