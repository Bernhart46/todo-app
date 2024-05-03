type ButtonProps = {
  event: () => void;
  children: React.ReactNode;
  r: React.LegacyRef<HTMLDivElement>;
  tabIndex: number;
};

export const GroupFunctionButton = (props: ButtonProps) => {
  const { event, children, r, tabIndex } = props;

  return (
    <div
      className="group-functions__button"
      onClick={event}
      role="button"
      tabIndex={tabIndex}
      ref={r}
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          event();
        }
      }}
    >
      {children}
    </div>
  );
};
