import { useRef } from "react";
import { ConfirmChoiceComponent } from "../confirm-choice";
import { InterfaceProps } from "./interface-types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { resetGroup } from "../../../store/todo/todo-slice";
import { useGetGroupName } from "../../../utils/hooks";

export const ResetStatusInterface = (props: InterfaceProps) => {
  const { groupName, setIsToggled } = props;
  const cancelButtonRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleReset = () => {
    dispatch(resetGroup({ groupName }));
    setIsToggled(false);
  };

  return (
    <ConfirmChoiceComponent
      confirmFn={handleReset}
      setShowed={setIsToggled}
      ref={cancelButtonRef}
      texts={{
        question: "Are you sure, you want to reset the group?",
        cancel: "No, don't reset!",
        confirm: "Yes, reset!",
      }}
    />
  );
};
