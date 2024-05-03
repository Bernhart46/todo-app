import { ConfirmChoiceComponent } from "../confirm-choice";
import { InterfaceProps } from "./interface-types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { removeTodos } from "../../../store/todo/todo-slice";

export const RemoveTodosInterface = (props: InterfaceProps) => {
  const { setIsToggled, groupName } = props;

  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeTodos({ groupName }));
    setIsToggled(false);
  };

  return (
    <ConfirmChoiceComponent
      confirmFn={handleRemove}
      setShowed={setIsToggled}
      texts={{
        question: "Are you sure, you want to remove the todos?",
        cancel: "No, don't remove!",
        confirm: "Yes, remove!",
      }}
    />
  );
};
