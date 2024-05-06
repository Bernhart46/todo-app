type ClearButtonProps = {
  setClearConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClearButton = ({ setClearConfirm }: ClearButtonProps) => {
  const handleClearClick = () => {
    setClearConfirm(true);
  };

  return (
    <div
      tabIndex={200003}
      role="button"
      className="settings__button disable-selection"
      onClick={handleClearClick}
      onKeyUp={(e) => {
        if (e.code === "Enter") {
          handleClearClick();
        }
      }}
    >
      Clear Data
    </div>
  );
};
