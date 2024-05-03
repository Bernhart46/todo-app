import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addNewTask } from "../../../store/todo/todo-slice";
import { calcNewHeight } from "../../../utils/functions";
import { useEffect, useRef, useState } from "react";
import { InterfaceProps } from "./interface-types";

import "./interface.css";
import { useAutoFocusElement } from "../../../utils/hooks";

type handleInputArguments = {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  type: "title" | "description";
};

export const NewTodoInterface = (props: InterfaceProps) => {
  const { groupName, setIsToggled } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useAutoFocusElement(titleRef);

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
        tabIndex={200004}
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
        tabIndex={200006}
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
        tabIndex={200005}
        className="todo-creation__description"
        value={description}
      ></textarea>
      <div
        role="button"
        onClick={cancelCreation}
        className="todo-creation__cancel-button"
        tabIndex={200007}
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
