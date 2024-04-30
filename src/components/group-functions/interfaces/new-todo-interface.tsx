import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addNewTask } from "../../../store/todo/todo-slice";
import { calcNewHeight } from "../../../utils/functions";
import { useRef, useState } from "react";
import { InterfaceProps } from "./interface-types";

import "./interface.css";

type handleInputArguments = {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  type: "title" | "description";
};

export const NewTodoInterface = (props: InterfaceProps) => {
  const { groupName, isToggled, setIsToggled } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  //IDK why are there refs, maybe I can use it for the tab navigation
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const resetForm = () => {
    setIsError(false);
    setTitle("");
    setDescription("");
    setIsToggled(false);
  };

  const cancelCreation = () => {
    resetForm();
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

  return (
    <div className="todo-creation__container">
      <textarea
        placeholder="Title"
        onChange={(e) => handleInput({ e, type: "title" })}
        tabIndex={isToggled ? 100402 : -1}
        className="todo-creation__title"
        ref={titleRef}
        value={title}
        style={{
          borderBottomColor: isError ? "red" : "white",
          outlineColor: isError ? "red" : "white",
        }}
      ></textarea>
      <div
        role="button"
        onClick={addTask}
        className="todo-creation__add-button"
        tabIndex={isToggled ? 100404 : -1}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            addTask();
          }
        }}
      >
        Add
      </div>

      <textarea
        placeholder="Description"
        onChange={(e) => handleInput({ e, type: "description" })}
        tabIndex={isToggled ? 100403 : -1}
        className="todo-creation__description"
        ref={descriptionRef}
        value={description}
      ></textarea>
      <div
        role="button"
        onClick={cancelCreation}
        className="todo-creation__cancel-button"
        tabIndex={isToggled ? 100405 : -1}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            cancelCreation();
          }
        }}
      >
        Cancel
      </div>
    </div>
  );
};
