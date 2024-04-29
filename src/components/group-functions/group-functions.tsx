import { useEffect, useState } from "react";
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

  const groupName = useGetGroupName();
  if (!groupName) return null;

  useEffect(() => {
    setIsEditMode(false);
  }, [groupName]);

  const handleButtonClick = (type: string) => {
    switch (type) {
      case "new-todo":
        setEditContent(
          <NewTodoInterface
            groupName={groupName}
            isToggled={isEditMode}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "reset-all":
        setEditContent(
          <ResetStatusInterface
            groupName={groupName}
            isToggled={isEditMode}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "rename-group":
        setEditContent(
          <RenameGroupInterface
            groupName={groupName}
            isToggled={isEditMode}
            setIsToggled={setIsEditMode}
          />
        );
        break;
      case "remove-group":
        setEditContent(
          <RemoveGroupInterface
            groupName={groupName}
            isToggled={isEditMode}
            setIsToggled={setIsEditMode}
          />
        );
        break;
    }
    setIsEditMode(true);
    scrollToBottom();
  };

  return (
    <div className="group-functions">
      <section className="group-functions__buttons">
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("new-todo")}
        >
          New Todo
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("reset-all")}
        >
          Reset All Status
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("rename-group")}
        >
          Rename Group
        </div>
        <div
          className="group-functions__button"
          onClick={() => handleButtonClick("remove-group")}
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
