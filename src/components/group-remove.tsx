import { useNavigate } from "react-router-dom";
import { setNavbarScrollTop } from "../store/visual/visual-slice";
import { removeGroup } from "../store/todo/todo-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useRef, useState } from "react";
import "./group-remove.css";

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
    <div className="confirm-remove-container">
      <h2>Are you sure, you want to remove the group?</h2>
      <div
        role="button"
        onClick={() => setIsConfirmShowed(false)}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            setIsConfirmShowed(false);
          }
        }}
        ref={cancelButtonRef}
        tabIndex={100406}
      >
        No, don't remove!
      </div>
      <div
        role="button"
        onClick={handleRemove}
        tabIndex={100407}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleRemove();
          }
        }}
      >
        Yes, remove!
      </div>
    </div>
  );
};
