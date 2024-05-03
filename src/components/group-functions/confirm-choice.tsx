import { forwardRef, useEffect, useRef } from "react";
import "./group-functions.css";
import { useAutoFocusElement } from "../../utils/hooks";

type ConfirmProps = {
  confirmFn: () => void;
  setShowed: React.Dispatch<React.SetStateAction<boolean>>;
  texts: {
    question: string;
    cancel: string;
    confirm: string;
  };
};

export const ConfirmChoiceComponent = (props: ConfirmProps) => {
  const { confirmFn, setShowed, texts } = props;
  const autoFocusRef = useRef<HTMLDivElement | null>(null);

  useAutoFocusElement(autoFocusRef);

  return (
    <>
      <h2 className="confirm-choice__question ">{texts.question}</h2>
      <div className="confirm-choice__buttons">
        <div
          role="button"
          className="confirm-choice__button disable-selection"
          onClick={() => setShowed(false)}
          ref={autoFocusRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              setShowed(false);
            }
          }}
          tabIndex={200004}
        >
          {texts.cancel}
        </div>
        <div
          role="button"
          className="confirm-choice__button disable-selection"
          onClick={confirmFn}
          tabIndex={200005}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              confirmFn();
            }
          }}
        >
          {texts.confirm}
        </div>
      </div>
    </>
  );
};
