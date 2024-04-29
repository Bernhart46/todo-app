import { forwardRef } from "react";
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

export const ConfirmChoiceComponent = forwardRef<
  HTMLDivElement | null,
  ConfirmProps
>((props: ConfirmProps, ref) => {
  const { confirmFn, setShowed, texts } = props;

  return (
    <>
      <h2 className="confirm-choice__question">{texts.question}</h2>
      <div className="confirm-choice__buttons">
        <div
          role="button"
          className="confirm-choice__button"
          onClick={() => setShowed(false)}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              setShowed(false);
            }
          }}
          ref={ref}
          tabIndex={100410}
        >
          {texts.cancel}
        </div>
        <div
          role="button"
          className="confirm-choice__button"
          onClick={confirmFn}
          tabIndex={100411}
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
});
