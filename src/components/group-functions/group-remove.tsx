import { useNavigate } from "react-router-dom";
import { setNavbarScrollTop } from "../../store/visual/visual-slice";
import { removeGroup } from "../../store/todo/todo-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect, useRef, useState } from "react";
import "./group-remove.css";
import { ConfirmChoiceComponent } from "./confirm-choice";

export const GroupRemoveCompontent = ({ groupName }: { groupName: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isConfirmShowed, setIsConfirmShowed] = useState<boolean | null>(null);
  const originalRemoveButtonRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLDivElement | null>(null);

  const handleRemove = () => {
    if (isConfirmShowed) {
      dispatch(removeGroup({ groupName }));
      dispatch(setNavbarScrollTop({ number: 0 }));
      navigate("/");
    } else {
      setIsConfirmShowed(true);
    }
  };

  useEffect(() => {
    if (isConfirmShowed === false) {
      originalRemoveButtonRef.current?.focus();
    }
    if (isConfirmShowed === true) {
      cancelButtonRef.current?.focus();
    }
  }, [isConfirmShowed]);

  return !isConfirmShowed ? (
    <div
      className="remove-group-button"
      tabIndex={100406}
      ref={originalRemoveButtonRef}
      onClick={handleRemove}
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          handleRemove();
        }
      }}
    >
      Remove Group
    </div>
  ) : (
    <ConfirmChoiceComponent
      confirmFn={handleRemove}
      setShowed={setIsConfirmShowed}
      ref={cancelButtonRef}
      texts={{
        question: "Are you sure, you want to remove the group?",
        cancel: "No, don't remove!",
        confirm: "Yes, remove!",
      }}
    />
  );
};
