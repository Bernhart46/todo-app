import { useRef } from "react";
import { ConfirmChoiceComponent } from "../confirm-choice";
import { InterfaceProps } from "./interface-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { removeGroup } from "../../../store/todo/todo-slice";
import { setNavbarScrollTop } from "../../../store/visual/visual-slice";

export const RemoveGroupInterface = (props: InterfaceProps) => {
  const { setIsToggled, groupName } = props;
  const cancelButtonRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeGroup({ groupName }));
    dispatch(setNavbarScrollTop({ number: 0 }));
    navigate("/");
  };

  return (
    <ConfirmChoiceComponent
      confirmFn={handleRemove}
      setShowed={setIsToggled}
      ref={cancelButtonRef}
      texts={{
        question: "Are you sure, you want to remove the group?",
        cancel: "No, don't remove!",
        confirm: "Yes, remove!",
      }}
    />
  );
};
