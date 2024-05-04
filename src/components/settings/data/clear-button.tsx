type ClearButtonProps = {
  setClearConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ClearButton = ({ setClearConfirm }: ClearButtonProps) => {
  const handleClearClick = () => {
    setClearConfirm(true);
  };

  return (
    <div
      role="button"
      className="settings__button disable-selection"
      onClick={handleClearClick}
    >
      Clear Data
    </div>
  );
};
