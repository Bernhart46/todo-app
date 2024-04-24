import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addNewTask } from "../store/todo/todo-slice";
import { calcNewHeight } from "../utils/functions";
import "./todo-creation.css";
import { GroupRemoveCompontent } from "./group-functions/group-remove";

export const TodoCreationComponent = ({
  groupName,
  scrollToBottom,
}: {
  groupName: string;
  scrollToBottom: () => void;
}) => {
  const [isCreateToggled, setIsCreateToggled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);

  const groups = useSelector((state: RootState) => state.todo);
  const group = groups.find((elem) => elem.name === groupName);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const cancelCreation = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsError(false);
    setTitle("");
    setDescription("");
    setIsCreateToggled(false);
  };

  const addTask = () => {
    if (title.trim() === "") {
      setIsError(true);
      return;
    }
    dispatch(
      addNewTask({
        groupName,
        title,
        description,
      })
    );
    resetForm();
  };

  type handleInputArguments = {
    e: React.ChangeEvent<HTMLTextAreaElement>;
    type: "title" | "description";
  };

  const handleInput = ({ e, type }: handleInputArguments) => {
    const MAX_LINES = type === "title" ? 5 : 10;
    const value = e.target.value;
    const lineArray = e.target.value.split("\n");
    const isMaxLines = lineArray.length > MAX_LINES;

    if (type === "title") {
      if (isMaxLines) return;
      setTitle(value);
      isError && setIsError(false);
    }
    if (type === "description") {
      if (isMaxLines) return;
      setDescription(value);
    }

    e.target.style.height = calcNewHeight(value) + "px";
  };

  return group ? (
    <>
      {!isCreateToggled ? (
        <>
          <div
            className="todo-creation-button"
            tabIndex={100401}
            onClick={() => {
              setIsCreateToggled(!isCreateToggled);

              scrollToBottom();
            }}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                setIsCreateToggled(true);
                scrollToBottom();
              }
            }}
          >
            Create Task
          </div>
          <GroupRemoveCompontent groupName={groupName} />
        </>
      ) : (
        <div className="todo-creation-form">
          <textarea
            placeholder="Title"
            onChange={(e) => handleInput({ e, type: "title" })}
            tabIndex={isCreateToggled ? 100402 : -1}
            className="todo-creation-title"
            ref={titleRef}
            value={title}
            style={{
              borderBottomColor: isError ? "red" : "white",
              outlineColor: isError ? "red" : "white",
            }}
          ></textarea>
          <button
            type="button"
            onClick={addTask}
            className="todo-creation-add-button"
            tabIndex={isCreateToggled ? 100404 : -1}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                addTask();
              }
            }}
          >
            Add
          </button>

          <textarea
            placeholder="Description"
            onChange={(e) => handleInput({ e, type: "description" })}
            tabIndex={isCreateToggled ? 100403 : -1}
            className="todo-creation-description"
            ref={descriptionRef}
            value={description}
          ></textarea>
          <button
            type="button"
            onClick={cancelCreation}
            className="todo-creation-cancel-button"
            tabIndex={isCreateToggled ? 100405 : -1}
            onKeyUp={(e) => {
              if (e.code === "Escape") {
                cancelCreation();
              }
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  ) : (
    <h1>ERROR</h1>
  );
};
