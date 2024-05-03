import { useEffect, useRef, useState } from "react";
import "./group-functions.css";
import { NewTodoInterface } from "./interfaces/new-todo-interface";
import { ResetStatusInterface } from "./interfaces/reset-status-interface";
import { RemoveGroupInterface } from "./interfaces/remove-group-interface";
import { RenameGroupInterface } from "./interfaces/rename-group-interface";
import { useGetGroupName } from "../../utils/hooks";
import { GroupFunctionButton } from "./group-function-button";
import { RemoveTodosInterface } from "./interfaces/remove-todos-interface";
import { SortTodosInterface } from "./interfaces/sort-todos-interface";

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
  const removeTodosRef = useRef<HTMLDivElement | null>(null);
  const sortTodosRef = useRef<HTMLDivElement | null>(null);

  const groupName = useGetGroupName();
  if (!groupName) return null;

  useEffect(() => {
    setIsEditMode(false);
  }, [groupName]);

  const functionButtons = [
    {
      id: "new-todo",
      ref: newTodoRef,
      content: (
        <NewTodoInterface groupName={groupName} setIsToggled={setIsEditMode} />
      ),
      tabIndex: 100000,
      title: "New Todo",
    },
    {
      id: "reset-all",
      ref: resetStatusRef,
      content: (
        <ResetStatusInterface
          groupName={groupName}
          setIsToggled={setIsEditMode}
        />
      ),
      tabIndex: 100001,
      title: "Reset All Status",
    },
    {
      id: "rename-group",
      ref: renameGroupRef,
      content: (
        <RenameGroupInterface
          groupName={groupName}
          setIsToggled={setIsEditMode}
        />
      ),
      tabIndex: 100002,
      title: "Rename Group",
    },
    {
      id: "remove-group",
      ref: removeGroupRef,
      content: (
        <RemoveGroupInterface
          groupName={groupName}
          setIsToggled={setIsEditMode}
        />
      ),
      tabIndex: 100003,
      title: "Remove Group",
    },
    {
      id: "remove-todos",
      ref: removeTodosRef,
      content: (
        <RemoveTodosInterface
          groupName={groupName}
          setIsToggled={setIsEditMode}
        />
      ),
      tabIndex: 100004,
      title: "Remove Todos",
    },
    {
      id: "sort-todos",
      ref: sortTodosRef,
      content: (
        <SortTodosInterface
          groupName={groupName}
          setIsToggled={setIsEditMode}
        />
      ),
      tabIndex: 100005,
      title: "Sort Todos",
    },
  ];

  //Autofocus when we cancel the interface interaction
  useEffect(() => {
    if (isEditMode) return;

    const ref = functionButtons.find((button) => button.id === type)?.ref;
    if (!ref) return;

    ref.current?.focus();
  }, [isEditMode]);

  //Shows Interface
  const handleButtonClick = (t: string) => {
    const content = functionButtons.find((button) => button.id === t)?.content;
    if (!content) return;

    setEditContent(content);

    setIsEditMode(true);
    setType(t);
    scrollToBottom();
  };

  return (
    <div className="group-functions">
      <section className="group-functions__buttons">
        {functionButtons.map((button, i) => {
          return (
            <GroupFunctionButton
              event={() => handleButtonClick(button.id)}
              r={button.ref}
              tabIndex={button.tabIndex}
              key={i}
            >
              {button.title}
            </GroupFunctionButton>
          );
        })}
      </section>
      {isEditMode && (
        <section className="group-functions__editor">{editContent}</section>
      )}
    </div>
  );
};
