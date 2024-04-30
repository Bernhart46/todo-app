import { useEffect, useRef, useState } from "react";
import "./group-functions.css";
import { NewTodoInterface } from "./interfaces/new-todo-interface";
import { ResetStatusInterface } from "./interfaces/reset-status-interface";
import { RemoveGroupInterface } from "./interfaces/remove-group-interface";
import { RenameGroupInterface } from "./interfaces/rename-group-interface";
import { useGetGroupName } from "../../utils/hooks";

type GroupFunctionsProps = {
  scrollToBottom: () => void;
};

export const GroupFunctionsComponent = (props: GroupFunctionsProps) => {
  const { scrollToBottom } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState<React.ReactNode>("");
  const [type, setType] = useState("");

  const newTodoRef = useRef<HTMLDivElement | null>(null);
  const resetStatusRef = useRef<HTMLDivElement | null>(null);
  const renameGroupRef = useRef<HTMLDivElement | null>(null);
  const removeGroupRef = useRef<HTMLDivElement | null>(null);

  const groupName = useGetGroupName();
  if (!groupName) return null;

  useEffect(() => {
    setIsEditMode(false);
  }, [groupName]);

  useEffect(() => {
    if (isEditMode) return;

    switch (type) {
      case "new-todo":
        newTodoRef.current?.focus();
        break;
      case "reset-all":
        resetStatusRef.current?.focus();
        break;
      case "rename-group":
        renameGroupRef.current?.focus();
        break;
      case "remove-group":
        removeGroupRef.current?.focus();
        break;
    }
  }, [isEditMode]);

  const handleButtonClick = (t: string) => {
    switch (t) {
      case "new-todo":
        setEditContent(
          <NewTodoInterface
            groupName={groupName}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "reset-all":
        setEditContent(
          <ResetStatusInterface
            groupName={groupName}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "rename-group":
        setEditContent(
          <RenameGroupInterface
            groupName={groupName}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "remove-group":
        setEditContent(
          <RemoveGroupInterface
            groupName={groupName}
            setIsToggled={setIsEditMode}
          />
        );
        break;
    }
    setIsEditMode(true);
    setType(t);
    scrollToBottom();
  };

  return (
    <div className="group-functions">
      <section className="group-functions__buttons">
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("new-todo")}
          tabIndex={100000}
          role="button"
          ref={newTodoRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              handleButtonClick("new-todo");
            }
          }}
        >
          New Todo
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("reset-all")}
          tabIndex={100001}
          role="button"
          ref={resetStatusRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              handleButtonClick("reset-all");
            }
          }}
        >
          Reset All Status
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("rename-group")}
          tabIndex={100002}
          role="button"
          ref={renameGroupRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              handleButtonClick("rename-group");
            }
          }}
        >
          Rename Group
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("remove-group")}
          tabIndex={100003}
          role="button"
          ref={removeGroupRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              handleButtonClick("remove-group");
            }
          }}
        >
          Remove Group
        </div>
      </section>
      {isEditMode && (
        <section className="group-functions__editor">{editContent}</section>
      )}
    </div>
  );
};
