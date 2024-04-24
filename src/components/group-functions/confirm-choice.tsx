import { forwardRef } from "react";

type ConfirmProps = {
  confirmFn: () => void;
  setShowed: React.Dispatch<React.SetStateAction<boolean | null>>;
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
    <div className="confirm-remove-container">
      <h2>{texts.question}</h2>
      <div
        role="button"
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
  );
});
