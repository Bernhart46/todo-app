import { useEffect, useRef, useState } from "react";
import "./group-functions.css";
import { NewTodoInterface } from "./interfaces/new-todo-interface";
import { ResetStatusInterface } from "./interfaces/reset-status-interface";
import { RemoveGroupInterface } from "./interfaces/remove-group-interface";
import { RenameGroupInterface } from "./interfaces/rename-group-interface";
import { useGetGroupName } from "../../utils/hooks";
import { GroupFunctionButton } from "./group-function-button";

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
        <GroupFunctionButton
          event={() => handleButtonClick("new-todo")}
          r={newTodoRef}
          tabIndex={100000}
        >
          New Todo
        </GroupFunctionButton>
        <GroupFunctionButton
          event={() => handleButtonClick("reset-all")}
          r={resetStatusRef}
          tabIndex={100001}
        >
          Reset All Status
        </GroupFunctionButton>
        <GroupFunctionButton
          event={() => handleButtonClick("rename-group")}
          r={renameGroupRef}
          tabIndex={100002}
        >
          Rename Group
        </GroupFunctionButton>
        <GroupFunctionButton
          event={() => handleButtonClick("remove-group")}
          r={removeGroupRef}
          tabIndex={100003}
        >
          Remove Group
        </GroupFunctionButton>
      </section>
      {isEditMode && (
        <section className="group-functions__editor">{editContent}</section>
      )}
    </div>
  );
};
