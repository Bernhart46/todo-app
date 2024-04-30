import { forwardRef, useEffect, useRef } from "react";
import "./group-functions.css";

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

  useEffect(() => {
    autoFocusRef.current?.focus();
  }, []);

  return (
    <>
      <h2 className="confirm-choice__question">{texts.question}</h2>
      <div className="confirm-choice__buttons">
        <div
          role="button"
          className="confirm-choice__button"
          onClick={() => setShowed(false)}
          ref={autoFocusRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              setShowed(false);
            }
          }}
          // ref={ref}
          tabIndex={100004}
        >
          {texts.cancel}
        </div>
        <div
          role="button"
          className="confirm-choice__button"
          onClick={confirmFn}
          tabIndex={100005}
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
