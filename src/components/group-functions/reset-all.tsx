import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ConfirmChoiceComponent } from "./confirm-choice";
import { resetGroup } from "../../store/todo/todo-slice";
import "./group-functions.css";

export const ResetAllComponent = ({ groupName }: { groupName: string }) => {
  const [isConfirmShowed, setIsConfirmShowed] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const originalResetButtonRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLDivElement | null>(null);

  const handleReset = () => {
    if (isConfirmShowed) {
      dispatch(resetGroup({ groupName }));
      setIsConfirmShowed(false);
    } else {
      setIsConfirmShowed(true);
    }
  };

  useEffect(() => {
    if (isConfirmShowed === false) {
      originalResetButtonRef.current?.focus();
    }
    if (isConfirmShowed === true) {
      cancelButtonRef.current?.focus();
    }
  }, [isConfirmShowed]);

  useEffect(() => {
    setIsConfirmShowed(false);
  }, [groupName]);

  return !isConfirmShowed ? (
    <div
      className="reset-all-button"
      tabIndex={100406}
      ref={originalResetButtonRef}
      onClick={handleReset}
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          handleReset();
        }
      }}
    >
      Reset All
    </div>
  ) : (
    // <ConfirmChoiceComponent
    //   confirmFn={handleReset}
    //   setShowed={setIsConfirmShowed}
    //   ref={cancelButtonRef}
    //   texts={{
    //     question: "Are you sure, you want to reset the group?",
    //     cancel: "No, don't reset!",
    //     confirm: "Yes, reset!",
    //   }}
    // />
    ""
  );
};
